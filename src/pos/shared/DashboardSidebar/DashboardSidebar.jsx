import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import accountsIcon from "../../assets/images/sidebar/accounts.svg";
import backupIcon from "../../assets/images/sidebar/backup.svg";
import dashboardIcon from "../../assets/images/sidebar/dashboard.svg";
import dueListIcon from "../../assets/images/sidebar/due-list.svg";
import expenseIcon from "../../assets/images/sidebar/expense.svg";
import feedbackIcon from "../../assets/images/sidebar/feedback.svg";
import incomeIcon from "../../assets/images/sidebar/income.svg";
import ledgerIcon from "../../assets/images/sidebar/ledger.svg";
import lossProfitIcon from "../../assets/images/sidebar/loss-profit.svg";
import onlineStoreIcon from "../../assets/images/sidebar/online-store.svg";
import partyListIcon from "../../assets/images/sidebar/party-list.svg";
import productIcon from "../../assets/images/sidebar/product.svg";
import purchaseIcon from "../../assets/images/sidebar/purchase.svg";
import reportsIcon from "../../assets/images/sidebar/reports.svg";
import salesIcon from "../../assets/images/sidebar/sales.svg";
import settingIcon from "../../assets/images/sidebar/setting.svg";
import smsIcon from "../../assets/images/sidebar/sms.svg";
import stockListIcon from "../../assets/images/sidebar/stock-list.svg";
import subscriptionPlanIcon from "../../assets/images/sidebar/subscription-plan.svg";
import supportIcon from "../../assets/images/sidebar/support.svg";
import warrantyIcon from "../../assets/images/sidebar/warranty.svg";

import itemsIcon from "../../assets/images/sidebar/settings/Item.svg";
import menuSettingIcon from "../../assets/images/sidebar/settings/menu-setting.svg";
import metricSettingIcon from "../../assets/images/sidebar/settings/metric-setting.svg";
import partiesIcon from "../../assets/images/sidebar/settings/parties.svg";
import printerIcon from "../../assets/images/sidebar/settings/printer.svg";
import productManagementIcon from "../../assets/images/sidebar/settings/product-management.svg";
import profileSetupIcon from "../../assets/images/sidebar/settings/profile-setup.svg";
import settingSmsIcon from "../../assets/images/sidebar/settings/sms.svg";
import transactionMessageIcon from "../../assets/images/sidebar/settings/transaction-message.svg";
import transactionsIcon from "../../assets/images/sidebar/settings/transactions.svg";
import userRoleIcon from "../../assets/images/sidebar/settings/user-role.svg";

import { useDispatch } from "react-redux";
import { setPrevSideBarMenu } from "../../redux/features/settings/settingsSlice";
import { handleMobileSidebar } from "../DashboardHeader/handleMobileSidebar";

const menuData = [
  { icon: dashboardIcon, route: "/", title: "Dashboard" },
  { icon: salesIcon, route: "sales", title: "Sales" },
  { icon: purchaseIcon, route: "purchase", title: "Purchase" },
  { icon: partyListIcon, route: "party", title: "Party List" },
  { icon: productIcon, route: "products", title: "Products" },
  { icon: productIcon, route: "warehouse", title: "Warehouse" },
  { icon: dueListIcon, route: "due", title: "Due List" },
  { icon: stockListIcon, route: "stock", title: "Stock List" },
  { icon: incomeIcon, route: "income", title: "Income" },
  { icon: expenseIcon, route: "expense", title: "Expense" },
  { icon: lossProfitIcon, route: "loss-profit", title: "Loss/Profit" },
  { icon: ledgerIcon, route: "ledger", title: "Ledger" },
  { icon: accountsIcon, route: "accounts", title: "Accounts" },
  { icon: reportsIcon, route: "reports", title: "Reports" },
  { icon: onlineStoreIcon, route: "store", title: "My Online Store" },
  { icon: warrantyIcon, route: "warranty", title: "Warranty" },
  { icon: smsIcon, route: "sms", title: "SMS" },
  {
    icon: subscriptionPlanIcon,
    route: "subscription",
    title: "Subscription Plan",
  },
  { icon: settingIcon, route: "setting", title: "Setting" },
  { icon: supportIcon, route: "support", title: "Support & Helpdesk" },
  { icon: feedbackIcon, route: "feedback", title: "Feedback" },
  { icon: backupIcon, route: "backup", title: "Backup/Restore" },
];

const settingMenuData = [
  { icon: profileSetupIcon, route: "profile", title: "Profile Setup" },
  {
    icon: productManagementIcon,
    route: "product-management",
    title: "Product Management",
  },
  { icon: menuSettingIcon, route: "menu", title: "Menu Setting" },
  { icon: metricSettingIcon, route: "metric", title: "Metric Setting" },
  { icon: transactionsIcon, route: "transactions", title: "Transactions" },
  { icon: printerIcon, route: "print", title: "Print" },
  { icon: settingSmsIcon, route: "sms", title: "SMS" },
  { icon: userRoleIcon, route: "role", title: "User Role" },
  {
    icon: transactionMessageIcon,
    route: "transaction-message",
    title: "Transaction Message",
  },
  { icon: partiesIcon, route: "parties", title: "Parties" },
  { icon: itemsIcon, route: "item", title: "Item" },
];

// settings
const DashboardSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [selectedMenu, setSelectedMenu] = useState("/");
  const [settingsMenu, setSettingsMenu] = useState(false);

  useEffect(() => {
    let foundMatch = false;
    // Check menuData
    menuData?.forEach((item) => {
      if (location?.pathname?.split("/")[1] === item.route) {
        setSelectedMenu(item.route);
        setSettingsMenu(false);
        foundMatch = true;
        dispatch(setPrevSideBarMenu(location?.pathname));

        // console.log("item.route", item.route);
      }
    });

    // Check settingMenuData
    settingMenuData?.forEach((item) => {
      const substring = location?.pathname?.split("/settings")[1]?.substring(1);
      if (substring === item.route) {
        setSelectedMenu(item.route);
        setSettingsMenu(true);
        foundMatch = true;
      }
    });

    // Default sidebar

    if (!foundMatch) {
      setSelectedMenu("/");
      setSettingsMenu(false);
    }
  }, [location.pathname, setSelectedMenu, menuData, settingMenuData]);

  const handleSidebarClose = () => {
    const closeButtons = document.querySelectorAll(".side-bar .close-btn");
    closeButtons.forEach((button) => {
      button.click();
    });
    const mainSection = document.querySelector(
      ".acnoo-dashboard-main-section.acnoo-reports-section"
    );
    if (mainSection) {
      mainSection.classList.add("active");
    }
  };

  // console.log("selectedMenu", selectedMenu);

  return (
    <>
      <nav className="side-bar print-d-none">
        <div className="side-bar-logo">
          {!settingsMenu ? (
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          ) : (
            <h3 className="text-white">Settings</h3>
          )}
          <button
            className="close-btn"
            onClick={() => handleMobileSidebar("-100%")}
          >
            <i className="fal fa-times"></i>
          </button>
        </div>
        <div className="side-bar-manu">
          {!settingsMenu ? (
            <ul>
              {menuData?.map((menu, index) => (
                <li
                  key={index}
                  className={menu?.route === selectedMenu ? "active" : ""}
                  onClick={handleSidebarClose}
                >
                  <Link to={menu?.route}>
                    <span className="icon">
                      <img src={menu?.icon} alt="icon" />
                    </span>
                    <span className="title">{menu?.title}</span>
                    <span className="arrow">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 330 330"
                      >
                        <path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z" />
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              {settingMenuData?.map((menu, index) => (
                <li
                  key={index}
                  className={menu?.route === selectedMenu ? "active" : ""}
                  onClick={handleSidebarClose}
                >
                  <Link to={`/settings/${menu?.route}`}>
                    <span className="icon">
                      <img src={menu?.icon} alt="icon" />
                    </span>
                    <span className="title">{menu?.title}</span>
                    <span className="arrow">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 330 330"
                      >
                        <path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z" />
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default DashboardSidebar;
