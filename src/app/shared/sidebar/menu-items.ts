import { RouteInfo } from "./sidebar.metadata";

export const ROUTES: RouteInfo[] = [
  {
    path: "/",
    title: "Home",
    icon: "mdi mdi-home-variant",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "",
    title: "Reports",
    icon: "mdi mdi-chart-line",
    class: "nav-small-cap",

    extralink: false,
    submenu: [
      // {
      //   path: '/sale-analytics/gold',
      //   title: 'Gold Sale',
      //   icon: 'mdi mdi-database',
      //   class: '',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/sale-analytics/gem',
      //   title: 'Gem Sale',
      //   icon: 'mdi mdi-diamond',
      //   class: '',
      //   extralink: false,
      //   submenu: []
      // },
      {
        path: "/starter",
        title: "Daily Sales Report",
        icon: "mdi mdi-note-text",
        class: "",
        extralink: false,
        submenu: [],
      },
      {
        path: "/customerdata",
        title: "Customer Data report",
        icon: "mdi mdi-note-text",
        class: "",
        extralink: false,
        submenu: [],
      },
      {
        path: "/gemsalesreport",
        title: "Gem Sale Report ",
        icon: "mdi mdi-note-text",
        class: "",
        extralink: false,
        submenu: [],

      },
      {
        path: "/branchStockReport",
        title: "Branch Stock Report",
        icon: "mdi mdi-note-text",
        class: "",
        extralink: false,
        submenu: [],

      },
      {
        path: "/monthlyBalanceReport",
        title: "Monthly Balance Report",
        icon: "mdi mdi-note-text",
        class: "",
        extralink: false,
        submenu: [],

      },
      {
        path: "/dailyCashCollection",
        title: "DailyCash Collection Report",
        icon: "mdi mdi-note-text",
        class: "",
        extralink: false,
        submenu: [],

      },
      {
        path: "/monthlyProductSaleModule",
        title: "Monthly ProductSale Report",
        icon: "mdi mdi-note-text",
        class: "",
        extralink: false,
        submenu: [],

      },
      {
        path: "/monthlySchemeMaturity",
        title: "Monthly SchemeMaturity Report",
        icon: "mdi mdi-note-text",
        class: "",
        extralink: false,
        submenu: [],

      },
      
    ]

  },
  // {
  //   path: "/starter",
  //   title: "Daily Sales",
  //   icon: "mdi mdi-shopping",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: "/dailynotes",
  //   title: "Daily Notes",
  //   icon: "mdi mdi-note-text",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  // {
  //   path: '/sale-analytics',
  //   title: 'Sale Analytics',
  //   icon: 'mdi mdi-chart-bubble',
  //   class: '',
  //   extralink: false,
  //   submenu: [
  //     {
  //       path: '/sale-analytics/gold',
  //       title: 'Gold Sale',
  //       icon: 'mdi mdi-database',
  //       class: '',
  //       extralink: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/sale-analytics/gem',
  //       title: 'Gem Sale',
  //       icon: 'mdi mdi-diamond',
  //       class: '',
  //       extralink: false,
  //       submenu: []
  //     }
  //   ]
  // },
];
