const userRoutes = [
    {
        routeName: "profile",
        label: "Profile",
        iconCompnay: "AntDesign",
        iconName: "profile",
        iconSize: 24,
    },
    {
        routeName: "myPosts",
        label: "My Posts",
        iconCompnay: "MaterialCommunityIcons",
        iconName: "post-outline",
        iconSize: 24,
    },
    {
        routeName: "addPost",
        label: "Add Post",
        iconCompnay: "MaterialIcons",
        iconName: "post-add",
        iconSize: 24,
    },
    {
        routeName:"map",
        label: "See Map",
        iconCompnay: "MaterialCommunityIcons",
        iconName: "google-maps",
        iconSize: 24,
    },
]

const receiverRoutes = [
    {
        routeName: "allPosts",
        label: "All Posts",
        iconCompnay: "MaterialCommunityIcons",
        iconName: "post-outline",
        iconSize: 24,
    },
    {
        routeName: "newOrder",
        label: "New Order",
        iconCompnay: "MaterialCommunityIcons",
        iconName: "post-outline",
        iconSize: 24,
    },
    {
        routeName: "completedOrders",
        label: "My Completed Orders",
        iconCompnay: "MaterialCommunityIcons",
        iconName: "post-outline",
        iconSize: 24,
    },
]


const adminRoutes = [
    {
        routeName: "allPosts",
        label: "Posts",
        iconCompnay: "MaterialCommunityIcons",
        iconName: "post-outline",
        iconSize: 24,
    },
    {
        routeName: "users",
        label: "Users",
        iconCompnay: "FontAwesome5",
        iconName: "users",
        iconSize: 20,
    },
    {
        routeName: "receivers",
        label: "Receivers",
        iconCompnay: "FontAwesome",
        iconName: "users",
        iconSize: 22,
    },
    {
        routeName: "feedbacks",
        label: "Feedbacks",
        iconCompnay: "MaterialIcons",
        iconName: "feedback",
        iconSize: 24,
    },
    {
        routeName: "complains",
        label: "Complains",
        iconCompnay: "MaterialIcons",
        iconName: "error",
        iconSize: 24,
    },
    
]


export {
    userRoutes,
    receiverRoutes,
    adminRoutes,
}