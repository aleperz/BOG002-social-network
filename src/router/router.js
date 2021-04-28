export class Router {
  constructor(routes) {
    window.addEventListener("hashchange", () => {
      this.onRouteChange();
    });
    this.mainContainer = document.querySelector("#root");
    this.routes = routes;
    this.onRouteChange();
  }

  onRouteChange() {
    const hashLocation = window.location.hash.substring(1);
    this.loadRoute(hashLocation);
  }

  matchUrlToRoute(urlSeg) {
    const matchedRoute = this.routes.find((route) => {
      const routePathSegs = route.path.substring(1);
      return routePathSegs === urlSeg;
    });
    return matchedRoute || this.routes[0];
  }

  loadRoute(urlSeg) {
    firebase.auth().onAuthStateChanged((user) => {
      let matchedRoute = this.matchUrlToRoute(urlSeg);
      if (user) {
        matchedRoute = matchedRoute.requireAuth ? matchedRoute : this.routes[5];
      } else {
        matchedRoute = !matchedRoute.requireAuth ? matchedRoute : this.routes[1];
      }

      const url = matchedRoute.path;
      window.history.pushState({}, 'done', url);
      // console.log(url);

      this.mainContainer.innerHTML = matchedRoute.template;
    });
  }
}
