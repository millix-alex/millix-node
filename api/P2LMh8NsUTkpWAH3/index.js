import wallet from '../../core/wallet/wallet';
import Endpoint from '../endpoint';
import _ from 'lodash';
import async from 'async';


/**
 * api reset_validation_transaction_by_guid
 */
class _P2LMh8NsUTkpWAH3 extends Endpoint {
    constructor(props) {
        super('P2LMh8NsUTkpWAH3');
    }

    /**
     * this API reset transaction validation by transaction guid
     * @param app
     * @param req
     * @param res
     */
    handler(app, req, res) {
        let transactionIdList;

        if (req.method === 'POST') {
            transactionIdList = req.body.p0;
        }
        else if (req.method === 'GET') {
            transactionIdList = req.query.p0;
        }

        if (!transactionIdList) {
            return res
                .status(400)
                .send({
                    api_status : 'fail',
                    api_message: `p0<transaction_guid>is required`
                });
        }

        let transactionIdSet = new Set(transactionIdList);
        wallet.resetTransactionValidationByTransactionId(transactionIdSet)
              .then(() => res.send({
                  api_status: 'success'
              }))
              .catch(e => res.send({
                  api_status : 'fail',
                  api_message: `unexpected generic api error: (${e})`
              }));
    }
}


export default new _P2LMh8NsUTkpWAH3();
