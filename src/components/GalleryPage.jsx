import React, { useState } from 'react';
import { useStaticQuery, StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import FrontCard from './common/FrontCard/';
import BgImage from './common/FrontCard/BgImage';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useLocation } from '@reach/router';
import { parse } from 'query-string';


const animatedComponents = makeAnimated();
function GalleryPage() {

  const location = useLocation();
  const { source: source } = parse(location.search);

  const Grid = styled.div`
    display: grid;
    align-items: top;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: minmax(min-content, max-content);

    grid-gap: 20px;
    // grid-gap: 64px;

    @media (max-width: 400px) {
      grid-template-columns: 1fr;
      grid-gap: 80px;
    }
  `;

  const SingleCard = styled.div`
    width: 400px;
    height: 400px;
  `;

  const data = useStaticQuery(graphql`
    query {
      hasura {
        sources:   dashboards_data_source {
          long_name
          short_name
        }
        cards {
          template_type
          title
          cards_tags {
            tag {
              tag_value
              id
            }
          }
          card_topics {
            cut
            topic {
              id
              value
            }
          }
          qb_card_bridges {
            question_bank {
              question_id
              data_source {
                geo
                short_name
              }
            }
          }
        }
      }
      images: allFile(filter: { sourceInstanceName: { eq: "templatetypes" } }) {
        edges {
          node {
            relativePath
            childImageSharp {
              fluid(maxWidth: 400, maxHeight: 400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);



 const sourcelookup =  data.hasura.sources
let initialsource = null 
 if (source){
  initialsource = [{ 
value: source, 
label:  sourcelookup.find( ({ short_name }) => short_name === source ).long_name
  }]
 }


  const bags = data.hasura.cards
    .map(d => {
      const tags1 = d.cards_tags.map(e => {
        if (e.tag !== null) {
          return e.tag.tag_value;
        }
      });
      return tags1;
    })
    .flat(2);

  const distinctbags = [...new Set(bags)];
  const tags = distinctbags.map(item => {
    return {
      value: item,
      label: item,
    };
  });

  const [selectedVariable, setSelectedVariable] = useState(null);
  const [selectedGeo, setSelectedGeo] = useState(null);
  const [selectedSource, setSelectedSource] = useState(initialsource);
 

  function containsAny(source, target) {
    var result = source.filter(function(item) {
      return target.indexOf(item) > -1;
    });
    return result.length > 0;
  }

  const carddata = data.hasura.cards.map(d => {
    const tags1 = d.cards_tags.map(e => {
      // return e.tag.tag_value;
      if (e.tag !== null) {
        return e.tag.tag_value;
      }
    });
    let topic;
    let cut;
    if (d.card_topics === undefined || d.card_topics.length == 0) {
      topic = null;
      cut = null;
    } else {
      topic = d.card_topics[0].topic.value;
      cut = d.card_topics[0].cut;
    }

    return {
      title: d.title,
      geo: d.qb_card_bridges[0].question_bank.data_source.geo,
      source: d.qb_card_bridges[0].question_bank.data_source.short_name,
      topic: topic,
      cut: cut,
      type: d.template_type,
      variable: d.qb_card_bridges[0].question_bank.question_id,
      tags: tags1,
    };
  });

  let cards;

  cards = selectedVariable
    ? carddata.filter(egg =>
        containsAny(
          egg.tags,
          selectedVariable.map(d => d.value)
        )
      )
    : carddata;
  cards = selectedGeo
    ? cards.filter(egg =>
        containsAny(
          [egg.geo],
          selectedGeo.map(d => d.value)
        )
      )
    : cards;

  cards = selectedSource
    ? cards.filter(egg =>
        containsAny(
          [egg.source],
          selectedSource.map(d => d.value)
        )
      )
    : cards;

  const tagopts = carddata
    .map(d => {
      const tags1 = d.tags.map(e => {
        if (e !== null) {
          return e;
        }
      });
      return tags1;
    })
    .flat(2);

  const tagoptsd = [...new Set(tagopts)];
  const tagso2 = tagoptsd.map(item => {
    return {
      value: item,
      label: item,
    };
  });



  const geos = [...new Set(carddata.map(d => d.geo))].map(item => {
    return {
      value: item,
      label: item,
    };
  })


const sources  = data.hasura.sources.map(item => {
  return {
    value: item.short_name,
    label: item.long_name,
  };
})

 


 
  return (
    <div id="container">
      <h1 style={{ marginBottom: 40 }}>Cards</h1>
      Data Source:
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={[]}
        isMulti
        value={selectedSource}
        onChange={v => setSelectedSource(v)}
        options={sources}
      />
      Geo:
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={[]}
        isMulti
        value={selectedGeo}
        onChange={v => setSelectedGeo(v)}
        options={geos}
      />
      Tags:
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={[]}
        isMulti
        value={selectedVariable}
        onChange={v => setSelectedVariable(v)}
        options={tagso2}
      />
      <div>
        <Grid>
          {cards.map(d => {
            const title = d.title;
            const path = d.cut
              ? `/Dashboards/${d.type}?v=${d.variable}&c=${d.cut}`
              : `/Dashboards/${d.type}?v=${d.variable}`;
            const image = d.type + '.png';
            const tags = d.tags;
            const source = d.source;
            const img = data.images.edges.find(({ node }) => node.relativePath === image).node;

            return (
              <FrontCard
                title={title}
                url={path}
                tags={tags}
                image={img.childImageSharp.fluid}
                key={title}
                subtitle={

                  ''
                }
              />
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

export default GalleryPage;
