import { createRootRoute, createRoute, createRouter, RouteComponent, Outlet } from '@tanstack/react-router'
import Home from './pages/home'
import Header from './components/header'
import Footer from './components/footer'


interface Route {
    path: string
    component: RouteComponent
}

const rootRoute = createRootRoute({
    component: () => (
        <>
            <Header />
            <main className="content">
                <Outlet />
            </main>
            <Footer />
        </>
    )
})

// Update routeList
const routeList: Route[] = [
    { path: '/', component: Home },
]

// Update createRouteTree function
function createRouteTree(routeList: Route[]) {
    return rootRoute.addChildren(routeList.map(route => 
        createRoute({
            getParentRoute: () => rootRoute,
            path: route.path,
            component: route.component,
        })
    ))
}

// Create the route tree
const routeTree = createRouteTree(routeList)

// Create the router
const router = createRouter({ routeTree })

export default router
