const routes = async () => {
  const path = window.location.pathname;

  if (path == "/") {
    const page = await import("../page/home");
    page.render();
  } else if (path == "/create.html") {
    const page = await import("../page/create");
    page.render();
  }
};

export default routes;
