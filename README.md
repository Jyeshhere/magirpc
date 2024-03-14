<h1>MAGI JavaScript Library (RPC)</h1>
<p>Easy-to-use JavaScript library for interacting with the Magi network. Requires a locally hosted wallet!</p>

<h2>Installation & Basic Usage</h2>
<p>Install the library:</p>
<pre><code>npm install magi-rpc</code></pre>

<p>Then you can import it in your JavaScript file:</p>
<pre><code>const MagiRpc = require('magi-rpc');</code></pre>

<p>Create a new instance of MagiRpc:</p>
<pre><code>const magi = new MagiRpc('username', 'password');</code></pre>

<h2>Getting a Wallet</h2>
<p>Create a wallet:</p>
<pre><code>const wallet = magi.createWallet();</code></pre>
<p>To name your wallet:</p>
<pre><code>const wallet = magi.createWallet('myCoolWallet');</code></pre>

<h2>Sending MAGI</h2>
<p>Sending funds:</p>
<pre><code>const txid = magi.send('from_address', 'to_address', amount);</code></pre>
<p>With memo(only visible privately):</p>
<pre><code>const txid = magi.send('from_address', 'to_address', amount, 'Memo');</code></pre>
<p>Without subtracting fee:</p>
<pre><code>const txid = magi.send('from_address', 'to_address', amount, 'Memo', 0.005, false);</code></pre>
<p>With custom fee:</p>
<pre><code>const txid = magi.send('from_address', 'to_address', amount, 'Memo', 0.01);</code></pre>

<h2>Other Functions</h2>
<p>List all wallet accounts:</p>
<pre><code>const wallets = magi.getWallets();</code></pre>

<p>Get label (name) of wallet address:</p>
<pre><code>const accountName = magi.getAccountName(address);</code></pre>

<p>Get address of wallet name (label):</p>
<pre><code>const accountAddress = magi.getAccountAddress(name);</code></pre>

<p>Get last transactions of wallet:</p>
<pre><code>const transactions = magi.getTransactions(wallet, limit);</code></pre>

<p>Create a wallet account:</p>
<pre><code>const newWallet = magi.createWallet(label);</code></pre>

<p>Get current MAGI price:</p>
<pre><code>const price = magi.getPrice();</code></pre>

<p>Get network statistics:</p>
<pre><code>const stats = magi.statistics();</code></pre>

<p>Get balance of an account:</p>
<pre><code>const balance = magi.getBalance(wallet);</code></pre>

<p>Get wallet sync status:</p>
<pre><code>const syncStatus = magi.syncStatus();</code></pre>

<p>Get transaction by TXID (hash):</p>
<pre><code>const transaction = magi.transactionByTxid(txid);</code></pre>

<p>Check if wallet (label) already exists:</p>
<pre><code>const exists = magi.walletExists(label);</code></pre>

<p>Get basic account (label/wallet) data:</p>
<pre><code>const accountData = magi.accountData(label);</code></pre>
</html>
