// import Icon from "assets/theme/components/icon";
import ExportedPage from "pages/ExportedPage";

export function createRoutes(navigations, pages) {
    const routes = [];
    console.log("navs", navigations)
    console.log("pages", pages)

    // Helper function to find child navigations
    function findCollapse(parentId) {
        return navigations.filter(nav => nav.parent_id?.$oid === parentId);
    }

    // Helper function to find pages for a navigation
    function findPages(navId) {
        return pages.filter(page => page.navigation_id === navId);
    }

    // Recursive function to create routes
    function createRoute(nav) {
        const route = {
            name: nav.name,
            route: `/${nav.name}`,
            collapse: [],
            dropdown: true,
        };

        // Add child navigations
        const collapse = findCollapse(nav._id.$oid);
        collapse.forEach(child => {
            if (child.visible === false) return;
            route.collapse.push(createRoute(child));
        });

        // Add pages
        const pages = findPages(nav._id.$oid);
        pages.forEach(page => {
            if (page.visible === false) return;
            route.collapse.push({
                name: page.name,
                route: `/${nav.name}/${page.endpoint}`,
                component: <ExportedPage page_id={page._id} />, // Replace with actual component
            });
        });

        return route;
    }

    // Start creating routes from root navigations
    const rootNavigations = navigations.filter(nav => nav.parent_id === null);
    rootNavigations.forEach(rootNav => {
        routes.push(createRoute(rootNav));
    });

    return routes;
}