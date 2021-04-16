export class Router {
  constructor(routes) {
    window.addEventListener('hashchange', () => this.onRouteChange());
    this.mainContainer = document.querySelector('#root');
    this.routes = routes;
    this.loadInitialRoute();
  }

  onRouteChange() {
    const hashLocation = window.location.hash.substring(1);
    this.loadRoute(hashLocation);
  }

  matchUrlToRoute(urlSeg) {
    const matchedRoute = this.routes.find((route) => {
      const routePathSegs = route.path.split('#').slice(1);
      if (routePathSegs.length !== urlSeg.length) return false;
      return routePathSegs.every(
        (routePathSeg, i) => routePathSeg === urlSeg[i],
      );
    });
    return matchedRoute || this.routes[0];
  }

  loadRoute(...urlSeg) {
    const matchedRoute = this.matchUrlToRoute(urlSeg);
    const url = `/${matchedRoute.path}`;
    window.history.pushState({}, 'done', url);
    this.mainContainer.innerHTML = matchedRoute.template;
  }

  loadInitialRoute() {
    const pathName = window.location.pathname.split('/');
    const pathSegs = pathName.length > 1 ? pathName.slice(1) : '#';
    this.loadRoute(...pathSegs);
  }
}
