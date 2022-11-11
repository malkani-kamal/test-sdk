/*
 * Copyright Paramount soft. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');
const { getContractObject } = require('../../utils/util.js');
const { NETWORK_PARAMETERS, DOCTYPE } = require('../../utils/Constants');
const logger = require('../../logger')(module);
// const { formatReferences, formatAssetInput } = require('../../utils/FormatStruct');
// const AssetType = require('../../models/AssetType')

class TokenController {

	constructor() {
	}

	async addToken(req, res, next) {
		try {
			console.log('*******Add Token Definition *******')

			let orgId = req.body.ownerOrgId;
			let orgName = "org" + orgId
			let user = req.body.userId;
			let tokenDef = req.body.data;

			const gateway = new Gateway();
			let contract = await getContractObject(orgName, user, NETWORK_PARAMETERS.CHANNEL_NAME, NETWORK_PARAMETERS.CHAINCODE_NAME, gateway)
			// let tokenData = JSON.parse(tokenDef);
			console.log('----------Creating Token------------\n', tokenDef)
			let stateTxn = contract.createTransaction('CreateToken');
			let tx = await stateTxn.submit(JSON.stringify(tokenDef));
			console.log('*** Token Added: committed');
			// let tx ='xxxxxxxxxxxxxxxxx'
			return res.status(200).send({
				status: true,
				message: "Token Added Successfully",
				txid: tx.toString()
			});
		} catch (error) {
			console.log(error.message)
			logger.error({ userInfo: req.loggerInfo, method: 'addToken', error })
			return res.status(500).send({
				status: false,
				message: error.message
			});
		}
	}


}


module.exports = TokenController;
