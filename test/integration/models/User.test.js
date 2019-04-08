var util = require('util');

describe('User (model)', () =>{

  describe('#findBestStudents()', () =>{
    it('should return 5 users',  done =>{
      User.findBestStudents()
        .then(bestStudents=>{

          if (bestStudents.length !== 5) {
            return done(new Error(
              'Should return exactly 5 students -- the students '+
              'from our test fixtures who are considered the "best".  '+
              'But instead, got: '+util.inspect(bestStudents, {depth:null})+''
            ));
          }//-•

          return done();

        })
        .catch(done);
    });
  });

});
