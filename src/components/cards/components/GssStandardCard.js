import React, { useState } from 'react';
import className from 'classnames';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Badge,
} from 'reactstrap';

import GssCardIndex from './gss/GssIndex';

const FrontCard = props => {
  const { data } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const tags = data.cards_questions[0].question_bank.tags_cards.map(d => d.tag.label);

  return (
    <>
      <a onClick={toggle}>
        <Card className="h-100">
          <CardImg top width="100%" src="https://picsum.photos/200/100" alt="Card image cap" />
          <CardBody>
            <CardTitle tag="h6">{data.name}</CardTitle>
            <Badge>{data.data_source.geography}</Badge>
            <Badge>{data.data_source.name}</Badge>
            <Badge color="secondary">{data.n_views} </Badge>

            {tags.map(t => {
              return <Badge color="primary">{t}</Badge>;
            })}
          </CardBody>
        </Card>
        <Modal isOpen={modal} toggle={toggle} className="modal-lg">
          <ModalHeader toggle={toggle}>{data.title}</ModalHeader>
          <ModalBody>
            <GssCardIndex />
          </ModalBody>
          <ModalFooter>
            <Button color="primary">{data.data_source.geography}</Button>{' '}
            <Button color="secondary">{data.data_source.name}</Button>
            <Badge color="secondary">{data.n_views} Views </Badge>
          </ModalFooter>
        </Modal>
      </a>
    </>
  );
};

export default FrontCard;
