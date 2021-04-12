export class Router {
  constructor(routes) {
    this.routes = routes;
    this.loadInitialRoute();
  }

  loadRoute(...urlSeg) {
    const matchedRoute = this.matchUrlToRoute(urlSeg);
    console.log(matchedRoute);
    const url = `/${urlSeg.join('/')}`;
    console.log(url);
    window.history.pushState({}, 'done', url);
    const routerOutElem = document.getElementById('root');
    routerOutElem.innerHTML = matchedRoute.template;
  }

  matchUrlToRoute(urlSeg) {
    const matchedRoute = this.routes.find((route) => {
      const routePathSegs = route.path.split('/').slice(1);
      if (routePathSegs.length !== urlSeg.length) return false;
      return routePathSegs.every(
        (routePathSeg, i) => routePathSeg === urlSeg[i],
      );
    });
    return matchedRoute;
  }

  loadInitialRoute() {
    const pathName = window.location.pathname.split('/');
    // console.log(pathName);
    const pathSegs = pathName.length > 1 ? pathName.slice(1) : '';
    this.loadRoute(...pathSegs);
  }
}
