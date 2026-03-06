# Cafe24 Variables Reference (250+)

## 1. Product Basic Info
| Variable | Description | Usage |
|----------|-------------|-------|
| `{$product_no}` | Product number | List, Detail |
| `{$product_name}` | Product name | List, Detail |
| `{$product_name_title}` | Product name (for title attr) | List |
| `{$product_name_title_display}` | Product name title display toggle | List |
| `{$name}` | Product name (detail page) | Detail |
| `{$product_code}` | Product code | Detail |
| `{$product_custom}` | Custom product info | Detail |
| `{$param}` | Product parameter (for links) | List |
| `{$link_product_detail}` | Product detail page link | List |
| `{$link_product_list}` | Category product list link | Category |

## 2. Product Price
| Variable | Description | Usage |
|----------|-------------|-------|
| `{$product_price}` | Product price (retail) | List, Detail |
| `{$product_sale_price}` | Sale price (discounted) | List, Detail |
| `{$product_price_mobile}` | Mobile product price | Mobile Detail |
| `{$mobile_dc_price}` | Mobile discount price | Mobile Detail |
| `{$mileage_value}` | Mileage/points | Detail |
| `{$dc_price}` | Member discount price | Detail |
| `{$dc_min_price}` | Minimum discount price | Detail |
| `{$display_product_sale_price}` | Sale price display toggle | Cart |

## 3. Product Image
| Variable | Description | Usage |
|----------|-------------|-------|
| `{$image_big}` | Main image (large) | Product Detail |
| `{$big_img}` | Detail page main image | Product Detail |
| `{$image_medium}` | List image (most used) | Product List |
| `{$image_small}` | Small image (thumbnail) | Detail bottom |
| `{$image_tiny}` | Tiny list image | Recently viewed |
| `{$zoom_param}` | Image zoom parameter | Detail |
| `{$top_image1_tag}` | Category top image 1 | List |
| `{$top_image2_tag}` | Category top image 2 | List |
| `{$top_image3_tag}` | Category top image 3 | List |

## 4. Product Status/Icons
| Variable | Description |
|----------|-------------|
| `{$soldout_icon}` | Sold out icon |
| `{$recommend_icon}` | Recommended icon |
| `{$new_icon}` | New product icon |
| `{$sale_icon}` | Sale icon |
| `{$product_icons}` | Product icons collection |
| `{$option_preview_icon}` | Option preview icon |
| `{$basket_icon}` | Cart icon |
| `{$zoom_icon}` | Zoom icon |
| `{$delvtype_display}` | Delivery type display |

## 5. Product Options
| Variable | Description |
|----------|-------------|
| `{$option_name}` | Option name (color, size, etc.) |
| `{$option_value}` | Option value |
| `{$option_maxlength}` | Option max character length |
| `{$add_option_name}` | Additional option name |
| `{$file_option_name}` | File option name |
| `{$form.option}` | Basic option form |
| `{$form.add_option}` | Additional option form |
| `{$form.option_value}` | Option value form |
| `{$quantity}` | Quantity |
| `{$color}` | Color chip color value |
| `{$option_str}` | Option string |

## 6. Product Detail / Shipping
| Variable | Description |
|----------|-------------|
| `{$product_detail}` | Product detail description |
| `{$item_display}` | Item display toggle |
| `{$item_title}` | Item title |
| `{$item_title_display}` | Item title display toggle |
| `{$item_content}` | Item content |
| `{$supply_info}` | Supplier info |
| `{$payment_info}` | Payment info |
| `{$shipping_method}` | Shipping method |
| `{$shipping_area}` | Shipping area |
| `{$shipping}` | Shipping fee |
| `{$delivery}` | Delivery info |
| `{$delivery_price}` | Delivery price |

## 7. Product Actions (Buy/Cart)
| Variable | Description |
|----------|-------------|
| `{$action_buy}` | Buy now |
| `{$action_basket}` | Add to cart |
| `{$action_wishlist}` | Add to wishlist |
| `{$action_recommend}` | Recommend |

## 8. Category
| Variable | Description |
|----------|-------------|
| `{$category_name}` | Category name |
| `{$category_title_text}` | Category title text |
| `{$category_title_text_display}` | Title text display toggle |
| `{$category_title_img}` | Category title image |
| `{$category_title_img_display}` | Title image display toggle |
| `{$title_text_or_image}` | Text or image title |
| `{$name_or_img_tag}` | Category name or image |
| `{$product_count}` | Product count in category |
| `{$product_count_display}` | Product count display toggle |
| `{$children_icon}` | Sub-category icon |
| `{$disp_cate_1}` ~ `{$disp_cate_4}` | Category depth 1~4 display |
| `{$name_1}` ~ `{$name_4}` | Category depth 1~4 name |
| `{$param_1}` ~ `{$param_4}` | Category depth 1~4 parameter |
| `{$param_cate_no}` | Category number parameter |

## 9. Sort / Pagination
| Variable | Description |
|----------|-------------|
| `{$total_count}` | Total product count |
| `{$param_first}` | First page link |
| `{$param_before}` | Previous page link |
| `{$param_next}` | Next page link |
| `{$param_last}` | Last page link |
| `{$param_class}` | Current page class |
| `{$no}` | Page number |
| `{$param_num}` | Page number parameter |
| `{$selected}` | Selected state |
| `{$value}` | Option value |
| `{$title}` | Option title |

## 10. Shopping Info
| Variable | Description |
|----------|-------------|
| `{$basket_cnt}` | Cart item count |
| `{$mylikeprd_total_cnt}` | Liked products count |
| `{$interest_prd_cnt}` | Wishlist product count |
| `{$mall_name}` | Shop name |
| `{$mobile_title}` | Mobile title |

## 11. Cart Variables
| Variable | Description |
|----------|-------------|
| `{$basket_count}` | Cart product count |
| `{$item_total}` | Item total |
| `{$img}` | Product image |
| `{$product_name}` | Product name |
| `{$product_sale_price}` | Sale price |
| `{$form.quantity}` | Quantity input |
| `{$option_str}` | Option string |
| `{$mileage}` | Mileage |
| `{$discount}` | Discount amount |
| `{$delv_price_front}` | Shipping (primary currency) |
| `{$delv_price_back}` | Shipping (secondary currency) |
| `{$delv_type}` | Delivery type |
| `{$sum_price_front}` | Subtotal (primary currency) |
| `{$sum_price_back}` | Subtotal (secondary currency) |
| `{$total_product_price}` | Total product amount |
| `{$total_option_price}` | Total option amount |
| `{$total_delv_price}` | Total shipping |
| `{$total_sum_price_front}` | Grand total (primary currency) |
| `{$total_sum_price_back}` | Grand total (secondary currency) |
| `{$action_modify}` | Modify action |
| `{$action_option_change}` | Option change |
| `{$action_wish_item}` | Move to wishlist |
| `{$action_buy_item}` | Buy selected items |

## 12. Order Form Variables
| Variable | Description |
|----------|-------------|
| `{$product_image}` | Product image |
| `{$product_name}` | Product name |
| `{$product_price_front}` | Product price |
| `{$product_quantity_text}` | Quantity text |
| `{$product_total_price_front}` | Product subtotal |
| `{$form.oname}` | Orderer name |
| `{$form.ozipcode1}` | Orderer zip code |
| `{$form.oaddr1}` | Orderer address |
| `{$form.ophone1_}` | Orderer phone |
| `{$form.oemail}` | Orderer email |
| `{$form.rname}` | Recipient name |
| `{$form.rzipcode1}` | Recipient zip code |
| `{$form.raddr1}` | Recipient address |
| `{$total_price}` | Total payment amount |
| `{$total_order_price_front}` | Total order amount |
| `{$coupon_cnt}` | Available coupon count |
| `{$total_avail_mileage}` | Available mileage |
| `{$total_deposit}` | Available deposit |
| `{$addr_paymethod}` | Payment method |
| `{$pname}` | Bank name |
| `{$bankaccount}` | Account number |
| `{$item_count}` | Item count |
| `{$price_unit_head}` | Currency unit |
| `{$mileage_name}` | Mileage name |

## 13. Member Info
| Variable | Description |
|----------|-------------|
| `{$member_name}` | Member name |
| `{$group_name}` | Member grade name |
| `{$member_login_module_id}` | Login module ID |
| `{$member_login_tab_display}` | Login tab display |
| `{$form.member_id}` | Member ID input |
| `{$form.member_passwd}` | Password input |
| `{$form.use_login_keeping}` | Keep logged in |
| `{$form.check_save_id}` | Save ID |
| `{$action_func_login}` | Login action |
| `{$returnUrl}` | Return URL after login |
| `{$display_nomember}` | Non-member order display toggle |
| `{$action_nomember_order}` | Non-member order action |

## 14. Board Variables
| Variable | Description |
|----------|-------------|
| `{$board_name}` | Board name |
| `{$board_title}` | Board title |
| `{$board_info}` | Board info |
| `{$board_adult_icon}` | Adult verification icon |
| `{$board_top_image}` | Board top image |
| `{$subject}` | Post title |
| `{$content}` | Post content |
| `{$writer}` | Author |
| `{$write_date}` | Write date |
| `{$hit_count}` | View count |
| `{$vote}` | Recommendation count |
| `{$point_count}` | Points |
| `{$comment_count}` | Comment count |
| `{$no}` | Post number |
| `{$notice_icon}` | Notice icon |
| `{$fixed_icon}` | Pinned post icon |
| `{$icon_re}` | Reply icon |
| `{$icon_new}` | NEW icon |
| `{$icon_hit}` | Hot post icon |
| `{$icon_file}` | Attachment icon |
| `{$icon_lock}` | Secret post icon |
| `{$member_icon}` | Member icon |
| `{$category_name}` | Category name |
| `{$list_bg_color}` | List background color |
| `{$list_char_color}` | List text color |
| `{$link_color}` | Link color |
| `{$checkbox}` | Checkbox |
| `{$param_read}` | Read post parameter |
| `{$param_write}` | Write post parameter |
| `{$param_prev}` | Previous page |
| `{$param_next}` | Next page |
| `{$form.board_category}` | Category select form |
| `{$form.search_key}` | Search keyword form |
| `{$form.search}` | Search text form |
| `{$form.search_date}` | Search date form |
| `{$action_search}` | Search action |
| `{$action_category_move}` | Category move action |
| `{$action_article_move}` | Article move action |
| `{$action_article_copy}` | Article copy action |
| `{$reply_sort}` | Comment sort |

## 15. Config Condition Variables (display)
| Variable | Description |
|----------|-------------|
| `{$config.is_category\|display}` | Category usage toggle |
| `{$config.use_date\|display}` | Date display toggle |
| `{$config.use_cnt\|display}` | View count display toggle |
| `{$config.is_use_recom\|display}` | Recommendation usage toggle |
| `{$config.is_use_point\|display}` | Point usage toggle |
| `{$write_display\|display}` | Write button display |
| `{$category_display\|display}` | Category column display |
| `{$date_display\|display}` | Date column display |
| `{$hit_display\|display}` | View count column display |
| `{$vote_display\|display}` | Recommendation column display |
| `{$point_display\|display}` | Point column display |
