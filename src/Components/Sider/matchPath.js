var matchPath = location => {
  var paths = location.pathname.split('/');
  if (paths != undefined && paths.length > 1) {
    paths.shift();
    return paths;
  } else {
    return [''];
  }
};
export default matchPath;
