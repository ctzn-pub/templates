import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import EssFrontCard from "./components/EssStandardCard.js"
import { Container, Row, Col, Badge } from 'reactstrap';


function EssStandard() {


  const data = useStaticQuery(graphql`
  query {
    hasura2 {
      cards(where: {cards_questions: {}, id: {_eq: "ess-happy"}}) {
        cards_questions {
          question_bank {
            tags_cards {
              tag {
                id
                label
              }
            }
          }
        }
        id
        image
        n_views
        name
        title
        topic {
          id
          label
        }
        data_source {
          name
          geography
        }
      }
    }
  }
  




  
  `)
 

 
 
 const cardList =  data.hasura2.cards
  return (
    <Container>
 
      <Row className="mb-3">
      {cardList.map(c=> {
            return (
              <Col xs="5" sm="4" md="3" lg="3" xl="3" key={c.id}>
              <EssFrontCard
                data={c}
              />
              </Col>
            );
          })}
      </Row>


    </Container>
  );
}

export default EssStandard;
