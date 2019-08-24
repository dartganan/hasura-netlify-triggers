/* Handle Hasura event trigger
 * This is what the structure of the event payload looks like
 *
 * {
 *   "event": {
 *       "op": "<op-name>",
 *       "data": {
 *         "old": <old-object>,
 *         "new": <new-object>
 *       }
 *   },
 *   "created_at": "<timestamp>",
 *   "id": "<uuid>",
 *   "trigger": {
 *       "name": "<name-of-trigger>",
 *       "id": "<event-uuid>"
 *   },
 *   "table":  {
 *       "schema": "<schema-name>",
 *       "name": "<table-name>"
 *   }
 * }
 *
 */

const axios = require('axios');

exports.handler = (lambdaEvent, context, cb) => {
  // Get the email of the user
  const hasuraTriggerPayload = JSON.parse(lambdaEvent.body);

  axios.post('https://onesignal.com/api/v1/notifications', {
    "app_id": "0f25b644-56f3-4fa2-96bb-f5a72606ebb8",
	"contents": {"en":"Mensagem nov2a"},
	"headings": {"en": "oi tudo bem 2"},
	"included_segments": ["All"],
    /* "Authorization": 'Basic OGE0NjNiZDgtNmYxYy00MDgxLTk1NjktNmU3ZjU0ZjY1NmVm',
    "Content-Type": 'application/x-www-form-urlencoded' */
  },{
    headers: {
      "Authorization": 'Basic OGE0NjNiZDgtNmYxYy00MDgxLTk1NjktNmU3ZjU0ZjY1NmVm',
      "Content-Type":application/x-www-form-urlencoded
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  console.log(hasuraTriggerPayload);
  const hasuraData = hasuraTriggerPayload.event.data.new;

  cb(null, {
    statusCode: 200,
    body: JSON.stringify({receivedData: hasuraData})
  });
};
