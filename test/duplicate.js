var fixtures = require('webtorrent-fixtures')
var test = require('tape')
var Hodlong = require('../')
var cryptico = require('cryptico')

test('client.seed followed by duplicate client.add (sync)', function (t) {
  t.plan(6)

  let privatePassphrase = 'This is a test phrase'
  let RSABits = 1024
  let rsaPrivateKey = cryptico.generateRSAKey(privatePassphrase, RSABits)

  // var client = new Hodlong({ dht: false, tracker: false })
  var client = new Hodlong({
    tracker: false,
    dht: false,
    endpoint: '127.0.0.1',
    signatureProvider: '',
    rsaPrivateKey: rsaPrivateKey,
    contractInfo: { 'hodlong': 'hodlong', 'trackers': 'trackers' }
  })

  client.on('error', function (err) { t.fail(err) })
  client.on('warning', function (err) { t.fail(err) })

  client.seed(fixtures.leaves.content, {
    name: 'Leaves of Grass by Walt Whitman.epub',
    announce: []
  }, function (torrent1) {
    t.equal(client.torrents.length, 1)

    var torrent2 = client.add(torrent1.infoHash)

    torrent2.once('ready', function () {
      t.fail('torrent ready is not called')
    })

    torrent2.once('error', function (err) {
      t.ok(err, 'got expected error on duplicate add')
      t.equal(client.torrents.length, 1)
      t.ok(torrent2.destroyed)
      client.destroy(function (err) {
        t.error(err, 'destroyed client')
        t.equal(client.torrents.length, 0)
      })
    })
  })
})

test('client.seed followed by duplicate client.add (async)', function (t) {
  t.plan(6)

  let privatePassphrase = 'This is a test phrase'
  let RSABits = 1024
  let rsaPrivateKey = cryptico.generateRSAKey(privatePassphrase, RSABits)

  // var client = new Hodlong({ dht: false, tracker: false })
  var client = new Hodlong({
    tracker: false,
    dht: false,
    endpoint: '127.0.0.1',
    signatureProvider: '',
    rsaPrivateKey: rsaPrivateKey,
    contractInfo: { 'hodlong': 'hodlong', 'trackers': 'trackers' }
  })
  client.on('error', function (err) { t.fail(err) })
  client.on('warning', function (err) { t.fail(err) })

  client.seed(fixtures.leaves.content, {
    name: 'Leaves of Grass by Walt Whitman.epub',
    announce: []
  }, function (torrent1) {
    t.equal(client.torrents.length, 1)

    var torrent2 = client.add(fixtures.leaves.torrentPath)

    torrent2.once('ready', function () {
      t.fail('torrent ready is not called')
    })

    torrent2.once('error', function (err) {
      t.ok(err, 'got expected error on duplicate add')
      t.equal(client.torrents.length, 1)
      t.ok(torrent2.destroyed)
      client.destroy(function (err) {
        t.error(err, 'destroyed client')
        t.equal(client.torrents.length, 0)
      })
    })
  })
})

test('client.seed followed by two duplicate client.add calls (sync)', function (t) {
  t.plan(9)

  let privatePassphrase = 'This is a test phrase'
  let RSABits = 1024
  let rsaPrivateKey = cryptico.generateRSAKey(privatePassphrase, RSABits)

  // var client = new Hodlong({ dht: false, tracker: false })
  var client = new Hodlong({
    tracker: false,
    dht: false,
    endpoint: '127.0.0.1',
    signatureProvider: '',
    rsaPrivateKey: rsaPrivateKey,
    contractInfo: { 'hodlong': 'hodlong', 'trackers': 'trackers' }
  })
  client.on('error', function (err) { t.fail(err) })
  client.on('warning', function (err) { t.fail(err) })

  client.seed(fixtures.leaves.content, {
    name: 'Leaves of Grass by Walt Whitman.epub',
    announce: []
  }, function (torrent1) {
    t.equal(client.torrents.length, 1)

    var torrent2 = client.add(torrent1.infoHash)

    torrent2.once('ready', function () {
      t.fail('torrent ready is not called')
    })

    torrent2.once('error', function (err) {
      t.ok(err, 'got expected error on duplicate add')
      t.equal(client.torrents.length, 1)
      t.ok(torrent2.destroyed)

      var torrent3 = client.add(torrent1.infoHash)

      torrent3.once('ready', function () {
        t.fail('torrent ready is not called')
      })

      torrent3.once('error', function (err) {
        t.ok(err, 'got expected error on duplicate add')
        t.equal(client.torrents.length, 1)
        t.ok(torrent3.destroyed)
        client.destroy(function (err) {
          t.error(err, 'destroyed client')
          t.equal(client.torrents.length, 0)
        })
      })
    })
  })
})

test('client.seed followed by two duplicate client.add calls (async)', function (t) {
  t.plan(9)

  let privatePassphrase = 'This is a test phrase'
  let RSABits = 1024
  let rsaPrivateKey = cryptico.generateRSAKey(privatePassphrase, RSABits)

  // var client = new Hodlong({ dht: false, tracker: false })
  var client = new Hodlong({
    tracker: false,
    dht: false,
    endpoint: '127.0.0.1',
    signatureProvider: '',
    rsaPrivateKey: rsaPrivateKey,
    contractInfo: { 'hodlong': 'hodlong', 'trackers': 'trackers' }
  })
  client.on('error', function (err) { t.fail(err) })
  client.on('warning', function (err) { t.fail(err) })

  client.seed(fixtures.leaves.content, {
    name: 'Leaves of Grass by Walt Whitman.epub',
    announce: []
  }, function (torrent1) {
    t.equal(client.torrents.length, 1)

    var torrent2 = client.add(fixtures.leaves.torrentPath)

    torrent2.once('ready', function () {
      t.fail('torrent ready is not called')
    })

    torrent2.once('error', function (err) {
      t.ok(err, 'got expected error on duplicate add')
      t.equal(client.torrents.length, 1)
      t.ok(torrent2.destroyed)

      var torrent3 = client.add(fixtures.leaves.torrentPath)

      torrent3.once('ready', function () {
        t.fail('torrent ready is not called')
      })

      torrent3.once('error', function (err) {
        t.ok(err, 'got expected error on duplicate add')
        t.equal(client.torrents.length, 1)
        t.ok(torrent3.destroyed)
        client.destroy(function (err) {
          t.error(err, 'destroyed client')
          t.equal(client.torrents.length, 0)
        })
      })
    })
  })
})

test('successive sync client.add, client.remove, client.add, client.remove (sync)', function (t) {
  t.plan(3)

  let privatePassphrase = 'This is a test phrase'
  let RSABits = 1024
  let rsaPrivateKey = cryptico.generateRSAKey(privatePassphrase, RSABits)

  // var client = new Hodlong({ dht: false, tracker: false })
  var client = new Hodlong({
    tracker: false,
    dht: false,
    endpoint: '127.0.0.1',
    signatureProvider: '',
    rsaPrivateKey: rsaPrivateKey,
    contractInfo: { 'hodlong': 'hodlong', 'trackers': 'trackers' }
  })
  client.on('error', function (err) { t.fail(err) })
  client.on('warning', function (err) { t.fail(err) })

  client.seed(fixtures.leaves.content, {
    name: 'Leaves of Grass by Walt Whitman.epub',
    announce: []
  }, function (torrent1) {
    t.equal(client.torrents.length, 1)

    client.add(torrent1.infoHash)
    client.remove(torrent1.infoHash)
    client.add(torrent1.infoHash)
    client.remove(torrent1.infoHash, function () {
      client.destroy(function (err) {
        t.error(err, 'destroyed client')
        t.equal(client.torrents.length, 0)
      })
    })
  })
})
