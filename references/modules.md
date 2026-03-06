# Cafe24 Modules Reference

## Layout Modules (layout.html)

| Module ID | Description | Key Variables |
|-----------|-------------|---------------|
| `Layout_LogoTop` | Shop logo (top) | `{$mall_name}`, `{$mobile_title}` |
| `Layout_category` | Product category menu | `{$name_or_img_tag}`, `{$link_product_list}`, `{$param_cate_no}` |
| `Layout_SearchHeader` | Product search (top) | `{$form.search}`, `{$action_search}` |
| `Layout_statelogon` | Logged-in state display | `{$name}`, `{$basket_cnt}` |
| `Layout_statelogoff` | Logged-out state display | - |
| `Layout_shoppingInfo` | Cart/mileage/wishlist info | `{$basket_cnt}`, `{$mylikeprd_total_cnt}`, `{$interest_prd_cnt}` |
| `Layout_orderBasketcount` | Cart item count | `{$basket_cnt}` |
| `Layout_MobileAction` | Mobile back navigation | `{$go_back}` |

### Layout Usage Example
```html
<!-- Logo -->
<h1 module="Layout_LogoTop">
  <a href="/">{$mall_name}</a>
</h1>

<!-- Category menu -->
<nav module="Layout_category">
  <ul>
    <li><a href="{$link_product_list}">{$name_or_img_tag}</a></li>
  </ul>
</nav>

<!-- Login state branch -->
<div module="Layout_statelogon">
  Welcome, {$name}! | <a href="/exec/front/Member/logout/">Logout</a>
</div>
<div module="Layout_statelogoff">
  <a href="/member/login.html">Login</a> | <a href="/member/join.html">Sign up</a>
</div>

<!-- Search -->
<div module="Layout_SearchHeader">
  <input type="text" name="search" value="{$form.search}">
  <button onclick="{$action_search}">Search</button>
</div>
```

---

## Product Modules

### Main Page Product Lists
| Module ID | Description | Note |
|-----------|-------------|------|
| `product_listmain_1` | Main recommended products | Numbers auto-generated based on admin category order |
| `product_listmain_2` | Main new products | Can have 5+ |
| `product_listmain_3` | Main additional category 1 | |
| `product_listmain_4` | Main additional category 2 | |
| `product_listmain_5` | Additional display (order 1) | |

### Category/List Page
| Module ID | Description |
|-----------|-------------|
| `product_headcategory` | Category breadcrumb + title/banner |
| `product_displaycategory` | Sub-category menu |
| `product_children` | Category child menu |
| `product_listrecommend` | Category recommended products |
| `product_listnew` | Category new products |
| `product_listnormal` | Normal product list |
| `product_ListItem` | Product list display items (common) |
| `product_normalmenu` | Product sort/search/compare |
| `product_normalpaging` | Product list pagination |
| `product_FirstSelect` | Conditional search first select |
| `product_SecondSelect` | Conditional search second select |
| `product_Colorchip` | Color chip preview |
| `product_Orderby` | Product sort function |

### Product Detail Page
| Module ID | Description |
|-----------|-------------|
| `product_detail` | Product main info (name, price, shipping) + purchase |
| `product_image` | Product image + zoom |
| `Product_mobileImage` | Mobile product image |
| `product_addimage` | Additional product images (thumbnails) |
| `product_Colorchip` | Color option chips |
| `product_option` | Basic product options (color, size, etc.) |
| `product_addoption` | Additional input options |
| `product_fileoption` | File upload options |
| `product_noneoption` | No-option product quantity select |
| `product_action` | Buy/cart/wishlist buttons |
| `product_setproduct` | Set product display |
| `product_addproduct` | Additional product display |
| `product_additional` | Product additional info |
| `product_detaildesign` | Product detail content (editor) |
| `product_relation` | Related products area |
| `product_relationlist` | Related products list |
| `product_review` | Product review list |
| `product_reviewpaging` | Review pagination |
| `product_qna` | Product Q&A list |
| `product_qnapaging` | Q&A pagination |
| `coupon_productdetail` | Product detail coupon display |
| `myshop_benefit` | Member discount/mileage info |

---

## Order/Cart Modules

### Cart (basket)
| Module ID | Description |
|-----------|-------------|
| `Order_TabInfo` | Domestic/international product tabs |
| `Order_Empty` | Empty cart notice |
| `Order_EmptyItem` | Cart product info |
| `Order_BasketOption` | Discount amount info |
| `Order_NormTitle` | Normal product title |
| `Order_NormNormal` | Normal product (standard shipping) |
| `Order_list` | Product list |
| `Order_optionAll` | All options |
| `Order_optionList` | Option list |
| `Order_optionAddList` | Additional option list |
| `Order_SuppNormal` | Normal product (supplier shipping) |
| `Order_NormIndividual` | Normal product (individual shipping) |
| `Order_NormOverseaTitle` | International shipping title |
| `Order_NormOversea` | Normal product (international shipping) |
| `Order_InstTitle` | Interest-free product title |
| `Order_InstNormal` | Interest-free product (standard shipping) |

### Order Form (orderform)
| Module ID | Description |
|-----------|-------------|
| `Order_form` | Order form main module |
| `Order_normallist` | Standard shipping product list |
| `Order_optionSet` | Product option setting |
| `Order_individuallist` | Individual shipping product list |
| `Order_oversealist` | International shipping product list |
| `Order_DeliveryList` | Delivery address selection list |
| `Order_ordadd` | Additional info input |

---

## Member Modules

| Module ID | Description | Key Variables |
|-----------|-------------|---------------|
| `member_login` | Login form (full screen) | `{$form.member_id}`, `{$form.member_passwd}`, `{$action_func_login}`, `{$returnUrl}` |
| `member_join` | Sign-up form | `{$form.member_id}`, `{$form.passwd}`, `{$form.name}`, `{$form.email}`, `{$action_func_join}` |
| `member_modify` | Profile edit | Similar to sign-up variables |
| `member_find` | Find ID/password | `{$form.name}`, `{$form.email}` |
| `MyShop_OrderHistoryNologin` | Non-member order lookup | `{$form.order_name}`, `{$form.order_id}`, `{$form.order_password}` |

### member_join Detail Variables

| Category | Variables |
|----------|-----------|
| Auth | `{$form.member_id}`, `{$form.passwd}`, `{$form.user_passwd_confirm}`, `{$form.hint}`, `{$form.hint_answer}` |
| Personal | `{$form.name}`, `{$form.name_en}`, `{$form.email}`, `{$form.is_news_mail}` |
| Contact | `{$form.phone}`, `{$form.mobile}`, `{$form.is_sms}` |
| Address | `{$form.postcode1}`, `{$form.postcode2}`, `{$form.addr1}`, `{$form.addr2}` |
| Extra | `{$form.nick_name}`, `{$form.is_sex}`, `{$form.birth_year}`, `{$form.birth_month}`, `{$form.birth_day}` |
| Job | `{$form.job_class}`, `{$form.job}`, `{$form.earning}`, `{$form.region}`, `{$form.reco_id}` |
| Refund | `{$form.bank_account_owner}`, `{$form.refund_bank_code}`, `{$form.bank_account_no}` |
| Verification | `{$action_ipin_open}`, `{$action_mobile_open}`, `{$action_check_id}`, `{$action_find_address}` |
| Business | `{$form.member_type}`, `{$form.company_type}`, `{$form.bname}`, `{$form.bssn1}`, `{$form.bssn2}`, `{$form.cname}`, `{$form.cssn}` |
| Foreigner | `{$form.foreigner_name}`, `{$form.foreigner_type}`, `{$form.foreigner_ssn}`, `{$form.citizenship}` |

---

## Board Modules

Board module numbers (e.g., `_1002`) change based on board number.

| Module ID | Description |
|-----------|-------------|
| `board_title_{no}` | Board title/info |
| `board_category` | Board category classification |
| `board_ReplySort` | Comment sort |
| `board_listheader_{no}` | List header (title, author, date columns) |
| `board_notice_{no}` | Notice list |
| `board_fixed_{no}` | Pinned posts |
| `board_list_{no}` | Normal post list |
| `board_ButtonList_{no}` | Write button etc. |
| `board_paging_{no}` | Pagination |
| `board_catemove_{no}` | Category/board move |
| `board_function_{no}` | Board functions (move, copy) |
| `board_search_{no}` | Board search |
| `board_listpackage_5` | Free board package |
| `board_listpackage_6` | Product Q&A package |
