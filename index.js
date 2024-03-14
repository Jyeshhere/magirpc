const RpcClient = require('bitcoind-rpc');
const axios = require('axios');
const { sha1 } = require('crypto');
const { randomInt } = require('crypto');
const { DateTime } = require('luxon');

class magirpc {
    constructor(rpcConfig) {
        this.rpcClient = new RpcClient(rpcConfig);
    }

    async getWallets() {
        try {
            return await this.rpcClient.listReceivedByAddress(0, true);
        } catch (err) {
            throw new Error(`Error while getting wallets: ${err.message}`);
        }
    }

    async getAccountName(address) {
        try {
            if (address.length === 34) {
                return await this.rpcClient.getAccount(address);
            } else {
                return address;
            }
        } catch (err) {
            throw new Error(`Error while getting account name: ${err.message}`);
        }
    }

    async getAccountAddress(address) {
        try {
            if (address.length !== 34) {
                const addresses = await this.rpcClient.getAddressesByAccount(address);
                return addresses[0];
            } else {
                return address;
            }
        } catch (err) {
            throw new Error(`Error while getting account address: ${err.message}`);
        }
    }

    async getTransactions(addressId, limit = 10) {
        try {
            if (!addressId) {
                return [];
            } else if (addressId === true) {
                return await this.rpcClient.listTransactions();
            } else {
                if (addressId.length === 34) {
                    addressId = await this.getAccountName(addressId);
                }
                return await this.rpcClient.listTransactions(addressId, limit);
            }
        } catch (err) {
            throw new Error(`Error while getting transactions: ${err.message}`);
        }
    }

    async createWallet(name = null) {
        try {
            if (await this.walletExists(name)) {
                throw new Error("Address already taken");
            }

            if (!name) {
                name = sha1(randomInt(-999999, 999999).toString()).digest('hex').slice(0, 8);
            }

            const address = await this.rpcClient.getNewAddress(name);

            return { address, name };
        } catch (err) {
            throw new Error(`Error while creating wallet: ${err.message}`);
        }
    }

    async send(sender, recipient, amount, memo = "none", txfee = 0.005, subtractFee = true) {
        try {
            if (sender.length === 34) {
                sender = await this.getAccountName(sender);
            }

            if (amount <= txfee) {
                throw new Error("Amount too small");
            }

            if (subtractFee) {
                amount = amount - txfee;
            }

            await this.rpcClient.setTxFee(txfee);

            const txid = await this.rpcClient.sendFrom(sender, recipient, amount, 1, memo);

            return txid;
        } catch (err) {
            throw new Error(`Error while sending funds: ${err.message}`);
        }
    }

    async getPrice() {
        try {
            const coingecko = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
            const btcpop = await axios.get("https://btcpop.co/api/market-public.php").catch(() => ({}));

            const _getBtcpopPrice = () => {
                try {
                    const xmgData = btcpop.data.find(row => row.ticker === "XMG");
                    return xmgData ? parseFloat(xmgData.lastTradePrice) * parseFloat(coingecko.data.bitcoin.usd) : 0;
                } catch {
                    return 0;
                }
            };

            const prices = {
                "btcpop": _getBtcpopPrice()
            };
            prices["max"] = prices[max(prices, key=prices.get)];

            return prices;
        } catch (err) {
            throw new Error(`Error while getting prices: ${err.message}`);
        }
    }

    async getStatistics() {
        try {
            const info = await this.rpcClient.getMiningInfo();
            const diff = info.difficulty;

            const connections = await this.rpcClient.getConnectionCount();

            let hoursToStake = "unknown";
            if (info["Expected PoS (days)"]) {
                hoursToStake = parseFloat(info["Expected PoS (days)"]) * 24;
            } else if (info["Expected PoS (hours)"]) {
                hoursToStake = parseFloat(info["Expected PoS (hours)"]);
            } else if (info["Expected PoS (minutes)"]) {
                hoursToStake = parseFloat(info["Expected PoS (minutes)"]) / 60;
            }

            return {
                "difficulty": {
                    "pow": parseFloat(diff["proof-of-work"]),
                    "pos": parseFloat(diff["proof-of-stake"])
                },
                "blocktx": parseInt(info["currentblocktx"]),
                "blocks": parseInt(info["blocks"]),
                "reward": parseFloat(info["blockvalue"]["blockvalue"]),
                "hashrate": parseFloat(info["networkhashps"]),
                "price": await this.getPrice(),
                "connections": connections,
                "stake_interest": parseFloat(info["stakeinterest"]),
                "hours_to_stake": hoursToStake,
                "total_balance": parseFloat(await this.rpcClient.getBalance()),
            };
        } catch (err) {
            throw new Error(`Error while getting statistics: ${err.message}`);
        }
    }

    async getBalance(account = null) {
        try {
            if (!account) {
                return parseFloat(await this.rpcClient.getBalance());
            } else {
                if (account.length === 34) {
                    account = await this.getAccountName(account);
                }
                return parseFloat(await this.rpcClient.getBalance(account, 1));
            }
        } catch (err) {
            throw new Error(`Error while getting balance: ${err.message}`);
        }
    }

    async syncStatus() {
        try {
            // Implementation of syncStatus method
        } catch (err) {
            throw new Error(`Error while getting sync status: ${err.message}`);
        }
    }

    async transactionByTxid(txid) {
        try {
            // Implementation of transactionByTxid method
        } catch (err) {
            throw new Error(`Error while getting transaction by txid: ${err.message}`);
        }
    }

    async walletExists(address) {
        try {
            const wallets = await this.getWallets();
            return wallets.some(acc => acc.address === address || acc.account === address);
        } catch (err) {
            throw new Error(`Error while checking wallet existence: ${err.message}`);
        }
    }

    async transactionData(transaction) {
        try {
            // Implementation of transactionData method
        } catch (err) {
            throw new Error(`Error while processing transaction data: ${err.message}`);
        }
    }

    async accountData(user) {
        try {
            // Implementation of accountData method
        } catch (err) {
            throw new Error(`Error while getting account data: ${err.message}`);
        }
    }

    async userData(user, limit = 10) {
        try {
            // Implementation of userData method
        } catch (err) {
            throw new Error(`Error while getting user data: ${err.message}`);
        }
    }
}

module.exports = magirpc;