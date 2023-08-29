import "../FP_Fields_CSS/hidden.css";
import { handleInput } from "../../redux/handlers";
import { useEffect } from "react";

const Hidden = ({ field, formKey }) => {
  const { value } = field;

  useEffect(() => {
    value.map(({ label, value }) => {
      switch (value) {
        case "product.id":
          handleInput(label, localStorage.getItem("RFB_PID"));
          break;
        case "product.title":
          handleInput(label, localStorage.getItem("RFB_PTitle"));
          break;
        case "product.vendor":
          handleInput(label, localStorage.getItem("RFB_PVendor"));
          break;
        case "product.type":
          handleInput(label, localStorage.getItem("RFB_PType"));
          break;
        case "product.price":
          handleInput(label, localStorage.getItem("RFB_PPrice"));
          break;
        case "product.available":
          handleInput(label, localStorage.getItem("RFB_PAvailable"));
          break;
        case "product.tags":
          handleInput(label, localStorage.getItem("RFB_PTags"));
          break;
        case "product.collections":
          handleInput(label, localStorage.getItem("RFB_PCollections"));
          break;
        case "customer.accepts_marketing":
          handleInput(label, localStorage.getItem("RFB_CAcceptsMarketing"));
          break;
        case "customer.has_account":
          handleInput(label, localStorage.getItem("RFB_CHasAccount"));
          break;
        case "customer.email":
          handleInput(label, localStorage.getItem("RFB_CEmail"));
          break;
        case "customer.phone":
          handleInput(label, localStorage.getItem("RFB_CPhone"));
          break;
        case "customer.id":
          handleInput(label, localStorage.getItem("RFB_CID"));
          break;
        case "customer.ipAddress":
          handleInput(label, localStorage.getItem("RFB_CIPAdd"));
          break;
        case "customer.name":
          handleInput(label, localStorage.getItem("RFB_CFullName"));
          break;
        case "customer.first_name":
          handleInput(label, localStorage.getItem("RFB_CFirstName"));
          break;
        case "customer.last_name":
          handleInput(label, localStorage.getItem("RFB_CLastName"));
          break;
        case "customer.orders":
          handleInput(label, localStorage.getItem("RFB_COrders"));
          break;
        case "customer.orders_count":
          handleInput(label, localStorage.getItem("RFB_COrdersCount"));
          break;
        case "customer.total_spent":
          handleInput(label, localStorage.getItem("RFB_CTotalSpent"));
          break;
        case "order.customer":
          handleInput(label, localStorage.getItem("RFB_OrderCustomer"));
          break;
        case "order.name":
          handleInput(label, localStorage.getItem("RFB_OrderName"));
          break;
        case "order.email":
          handleInput(label, localStorage.getItem("RFB_OrderEmail"));
          break;
        case "collection.title":
          handleInput(label, localStorage.getItem("RFB_CollectionTitle"));
          break;
        case "collection.products":
          handleInput(label, localStorage.getItem("RFB_CollectionProducts"));
          break;
        case "collection.tags":
          handleInput(label, localStorage.getItem("RFB_CollectionTags"));
          break;
        case "collection.url":
          handleInput(label, localStorage.getItem("RFB_CollectionUrl"));
          break;
        case "collection.all_products_count":
          handleInput(
            label,
            localStorage.getItem("RFB_CollectionAllProductCount")
          );
          break;
        case "page.url":
          handleInput(label, localStorage.getItem("RFB_PageUrl"));
          break;
        case "page.title":
          handleInput(label, localStorage.getItem("RFB_PageTitle"));
          break;
        case "page.handle":
          handleInput(label, localStorage.getItem("RFB_PageHandle"));
          break;
        case "page.id":
          handleInput(label, localStorage.getItem("RFB_PageId"));
          break;
        case "shop.url":
          handleInput(label, localStorage.getItem("RFB_ShopUrl"));
          break;
        case "shop.currency":
          handleInput(label, localStorage.getItem("RFB_ShopCurrency"));
          break;
        default:
          break;
      }
    });
  }, [value, formKey]);

  return (
    <div className="hidden-previewer" style={{ minWidth: "100%" }}>
      {value &&
        value.map((hiddenObj) => (
          <input key={hiddenObj.value} type="hidden" value={hiddenObj.value} />
        ))}
      ;
    </div>
  );
};

export default Hidden;
