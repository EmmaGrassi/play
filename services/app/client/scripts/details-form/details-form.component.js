export default {
  controller() {
    this.save = function() {
      console.log('==== save')
    }
  },
  template: `
    <div class="container-fluid">
      <div class="row">
        <h2>Fill in your data</h2>
        
        <form novalidate ng-submit="$ctrl.save()">
          <div class="form-group">
            <label class="control-label" for="form-name">Name</label>
            <input type="text" id="form-name" placeholder="E.g. Thomas" class="form-control">
          </div>
      
          <div class="form-group">
            <label class="control-label" for="form-surname">Surname</label>
            <input type="text" id="form-surname" placeholder="E.g. Mann" class="form-control">
          </div>
      
          <div class="form-group">
            <label class="control-label" for="form-twitter">Twitter (Optional)</label>
            <input type="text" id="form-twitter" placeholder="@sytac" class="form-control">
          </div>
      
          <div class="form-group">
            <label class="control-label" for="form-email">Email</label>
            <input type="email" id="form-email" placeholder="thomas@sytac.io" class="form-control">
          </div>
      
          <div class="form-group">
            <label class="control-label" for="form-tech">I love... (optional)</label>
            <select class="form-control" id="form-tech" multiple="" size="5">
              <option value="clj">Clojure</option>
              <option value="Haskell">Haskell</option>
              <option value="cljs">ClojureScript</option>
              <option value="java">Good old Java</option>
              <option value="scala">Scala</option>
              <option value="js">Javascript</option>
              <option value="react">ReactJS</option>
              <option value="emacs">Emacs</option>
              <option value="vim">Vim</option>
              <option value="erlang">Erlang</option>
              <option value="data-science">Data Science</option>
            </select>
          </div>
            
          <div class="checkbox">
            <label>
              <input type="checkbox"> Terms of service
            </label>
            <p>Sytac can contact me for business opportunities and promotional information</p>
          </div>
          
          <div class="lang-chooser">
            <h4>Choose your technology to start the quiz:</h4>
            <div class="text-center" style="padding-top: 10px;">
              <div class="btn-group" role="group">
                <button title="scala" type="button" class="btn btn-default" style="float: left;">
                  <img alt="scala" src="images/scala-logo.png" style="width: 50px;">
                </button>
                <button title="clojure" type="button" class="btn btn-default" style="float: left;">
                  <img alt="clojure" src="images/clojure-logo.png" style="width: 50px;">
                </button>
                <button title="android" type="button" class="btn btn-default" style="float: left;">
                  <img alt="android" src="images/android-logo.png" style="width: 50px;">
                </button>
                <button title="javascript" type="button" class="btn btn-default" style="float: left;">
                  <img alt="javascript" src="images/javascript-logo.png" style="width: 50px;">
                </button>
                <button title="java" type="button" class="btn btn-default" style="float: left;">
                  <img alt="java" src="images/java-logo.png" style="width: 50px;">
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `
}
