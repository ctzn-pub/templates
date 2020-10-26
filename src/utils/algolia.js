const escapeStringRegexp = require('escape-string-regexp');

const pagePath = `content`;
const indexName = `Gallery`;

const pageQuery = `{
  hasura {
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
            long_name
          }
        }
      }
    }
  }
}`;

function pageToAlgoliaRecord(d) {
  return {
    type: d.template_type,
    title: d.title,
    topic: d.card_topics,
    tags:
      d.cards_tags.length == 0
        ? []
        : d.cards_tags
            .map(e => {
              if (e.tag !== null) {
                return e.tag.tag_value;
              }
            })
            .filter(tag => tag !== undefined),
    qid: d.qb_card_bridges[0].question_bank.question_id,
    geo: d.qb_card_bridges[0].question_bank.data_source.geo,
    source: d.qb_card_bridges[0].question_bank.data_source,
  };
}
const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.hasura.cards.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
];

module.exports = queries;
