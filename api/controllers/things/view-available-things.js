module.exports = {


  friendlyName: 'View available things',


  description: 'Display "Available things" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/things/available-things'
    }

  },


  fn: async function () {

    // var things = [
    //   {id: 1, label: 'Sweet Red Drill'},
    //   {id: 2, label: 'Rad Mountain Bike'},
    // ];
    // TODO: come back to this and only fetch things that the current user is allowed to see
    // TODO: возвращаемся к этому и выбираем только то, что текущему пользователю разрешено видеть
    let things = await Thing.find({

      owner:this.req.me.id
    });

    // Respond with view.
    return {things};

  }


};
