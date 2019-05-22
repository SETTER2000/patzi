module.exports = {


  friendlyName: 'Get hello',


  description: '',


  inputs: {},


  exits: {
    success: {
      anyData: 'Вы подключились к комнате user и слушаете событие hello'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The user who makes this request does not have permission to delete this entry.',
      responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
    },
    badRequest: {
      description: 'Error.',
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs, exits) {

    const req = this.req;
    // const res = this.res;

    // Make sure this is a socket request (not traditional HTTP)
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }

    // Have the socket which made the request join the "user" room.
    // Подключить сокет, который сделал запрос, к комнате «user».
    await sails.sockets.join(req, 'user');
    let users = await User.find();
    await sails.sockets.broadcast('user', 'hello', users);
    // Broadcast a notification to all the sockets who have joined
    // the "userSockets" room, excluding our newly added socket:
    // Трансляция уведомления всем сокетам, которые присоединились к
    // комнате user, исключая наш недавно добавленный сокет:
    // hello - событие на которое подписался сокет клиента
    /*  sails.sockets.broadcast('user', 'hello', {
      currentSection: 'portfolio',
      dateFilter,
      users
    }, req);*/

    // ^^^
    // At this point, we've blasted out a socket message to all sockets who have
    // joined the "userSockets" room.  But that doesn't necessarily mean they
    // are _listening_.  In other words, to actually handle the socket message,
    // connected sockets need to be listening for this particular event (in this
    // case, we broadcasted our message with an event name of "hello").  The
    // client-side code you'd need to write looks like this:
    // На этом этапе мы отправили сообщение сокета всем сокетам, которые
    // присоединились к комнате "userSockets". Но это не обязательно означает, что они
    // _listening_. Другими словами, чтобы фактически обработать сообщение сокета,
    // подключенные сокеты должны прослушивать это конкретное событие (в этом
    // case, мы транслировали наше сообщение с именем события "hello").
    // код на стороне клиента, который вам нужно написать, выглядит следующим образом:
    //   io.socket.on('hello', function (broadcastedData){
    //       console.log(data.howdy);
    //       // => 'hi there!'
    //   }
    //

    // Now that we've broadcasted our socket message, we still have to continue on
    // with any other logic we need to take care of in our action, and then send a
    // response.  In this case, we're just about wrapped up, so we'll continue on
    // Теперь, когда мы транслировали наше сообщение сокета, нам все еще нужно продолжить
    // с любой другой логикой, о которой мы должны позаботиться в наших действиях, а затем отправить
    // ответ. В этом случае мы почти закончили, поэтому продолжим

    // Respond to the request with a 200 OK.
    // The data returned here is what we received back on the client as `data` in:
    // `io.socket.get('/say/hello', function gotResponse(data, jwRes) { /* ... */ });`
    // Ответить на запрос с 200 OK.
    // Возвращаемые здесь данные - это то, что мы получим обратно на клиенте как `data` в:
    // `io.socket.get('/say/hello', function gotResponse(data, jwRes) {/ * ... * /});`


    // Respond with view.
    return exits.success();


  }


};
