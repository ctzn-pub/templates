import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import FrontCard from "./components/GssStandardCard.js"
import { Container, Row, Col, Badge } from 'reactstrap';


function GssStandard() {


  const data = useStaticQuery(graphql`
  query MyQuery {
    hasura2 {
      cards {
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
      {cardList.slice(0,1).map(c=> {
            return (
              <Col xs="5" sm="4" md="3" lg="3" xl="3" key={c.id}>
              <FrontCard
                data={c}
              />
              </Col>
            );
          })}
      </Row>


    </Container>
  );
}

export default GssStandard;
