export class Router {
  constructor(routes) {
    window.addEventListener("hashchange", () => this.onRouteChange());
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
      const routePathSegs = route.path.split("#").slice(1);
      if (routePathSegs.length !== urlSeg.length) return false;
      return routePathSegs.every(
        (routePathSeg, i) => routePathSeg === urlSeg[i],
      );
    });
    return matchedRoute || this.routes[0];
  }

  loadRoute(...urlSeg) {
    const matchedRoute = this.matchUrlToRoute(urlSeg);
    this.mainContainer.innerHTML = matchedRoute.template;
  }
}
