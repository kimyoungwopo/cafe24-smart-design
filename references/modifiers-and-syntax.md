# Cafe24 Modifiers, Control Flow & Patterns

## Modifiers (13 types)

Format: `{$variable|modifier:parameter}`

| # | Name | Purpose | Syntax | Example |
|---|------|---------|--------|---------|
| 1 | `cut` | String truncation | `{$v\|cut:length,suffix}` | `{$product_name\|cut:20,...}` |
| 2 | `numberformat` | Thousands separator | `{$v\|numberformat}` | `{$product_price\|numberformat}` |
| 3 | `date` | Date format | `{$v\|date:Y-m-d}` | `{$write_date\|date:Y.m.d}` |
| 4 | `display` | false -> display:none | `{$v\|display}` | `class="{$soldout_icon\|display}"` |
| 5 | `cover` | Wrap string | `{$v\|cover:before,after}` | `{$subject\|cover:[,]}` |
| 6 | `replace` | String replace | `{$v\|replace:find,replace}` | `{$notice_icon\|replace:notice,NOTICE}` |
| 7 | `strconv` | String convert | `{$v\|strconv:text}` | `{$new_icon\|strconv:NEW}` |
| 8 | `imgconv` | Image tag convert | `{$v\|imgconv:path}` | `{$name_or_img_tag\|imgconv:'/img/a.png'}` |
| 9 | `nl2br` | Newline -> `<br>` | `{$v\|nl2br}` | `{$content\|nl2br}` |
| 10 | `striptag` | Remove HTML tags | `{$v\|striptag}` | `{$content\|striptag}` |
| 11 | `timetodate` | Timestamp -> date | `{$v\|timetodate:Y-m-d}` | `{$write_date\|timetodate:Y-m-d}` |
| 12 | `lower` | To lowercase | `{$v\|lower}` | `{$category_name\|lower}` |
| 13 | `upper` | To uppercase | `{$v\|upper}` | `{$category_name\|upper}` |

---

## Module Declaration

```html
<div module="ModuleId">
  <!-- HTML + {$variables} -->
</div>
```

## Comment Options

```html
<div module="product_listrecommend">
  <!--
  $fixed = top
  $count = 15
  $only_html = no
  -->
  ...module content...
</div>
```

| Option | Description | Value | Priority |
|--------|-------------|-------|----------|
| `$count` | Repeat count | Number | 2 |
| `$only_html` | Repeat only HTML item count | yes / no | 1 (highest) |
| `$fixed` | Fixed position | top etc. | - |

**IMPORTANT**: Comment options MUST include line breaks. Single-line won't work.

---

## Control Flow

### Conditional Display

**Method 1: display modifier**
```html
<!-- Hidden when value is false (display:none) -->
<span class="{$soldout_icon|display}">
  SOLD OUT
</span>

<!-- Config condition -->
<th class="{$config.use_date|display}">
  Date
</th>
```

**Method 2: Login state modules**
```html
<!-- Logged in only -->
<div module="Layout_statelogon">
  Welcome, {$name}!
</div>

<!-- Logged out only -->
<div module="Layout_statelogoff">
  <a href="/member/login.html">Login</a>
</div>
```

### Loops

**$count loop**
```html
<ul module="product_listnormal">
  <!-- $count = 5 -->
  <li>{$product_name}</li>
</ul>
<!-- li repeats 5 times -->
```

**$only_html loop**
```html
<ul module="Module_Action">
  <!--
  $count = 5
  $only_html = yes
  -->
  <li>{$title}</li>
  <li>{$title}</li>
  <li>{$title}</li>
</ul>
<!-- Only 3 items rendered (HTML count) -->
```

**Loop behavior**:
- Same items: `$count=5` -> 5 items generated
- 3 different items + `$count=5` -> last item repeats to make 5 total

---

## File Include & Resources

| Type | Cafe24 Syntax | Standard HTML |
|------|---------------|---------------|
| Layout | `<!--@layout(/layout/basic/product.html)-->` | - |
| File include | `<!--@import(/layout/basic/header.html)-->` | - |
| CSS | `<!--@css(/css/style.css)-->` | `<link rel="stylesheet" href="/design/skin/{skin}/css/style.css">` |
| JS | `<!--@js(/js/script.js)-->` | `<script src="/design/skin/{skin}/js/script.js"></script>` |

**Cache busting**: `<!--@css(/css/style.css?ver=20260305)-->`

---

## Practical Code Patterns

### Main Page - Recommended Product Grid
```html
<div module="product_listmain_1" class="product-grid">
  <!-- $count = 8 -->
  <h2>{$category_title_text}</h2>
  <ul>
    <li class="product-card">
      <a href="{$link_product_detail}">
        <div class="img-wrap">
          <img src="{$image_medium}" alt="{$product_name}">
          <span class="{$soldout_icon|display}">SOLD OUT</span>
          <span class="{$new_icon|display}">NEW</span>
        </div>
        <div class="info">
          <p class="name">{$product_name|cut:30,...}</p>
          <p class="price">{$product_sale_price|numberformat}won</p>
        </div>
      </a>
    </li>
  </ul>
</div>
```

### Product Detail - Basic Structure
```html
<!-- Category breadcrumb -->
<div module="product_headcategory">
  <ol>
    <li><a href="/">HOME</a></li>
    <li class="{$disp_cate_1}"><a href="{$param_1}">{$name_1}</a></li>
    <li class="{$disp_cate_2}"><a href="{$param_2}">{$name_2}</a></li>
  </ol>
</div>

<!-- Product image -->
<div module="product_image">
  <img src="{$big_img}" alt="{$name}">
</div>

<!-- Product info -->
<div module="product_detail">
  <h2>{$name}</h2>
  <p class="price">{$product_sale_price|numberformat}won</p>
  <p class="mileage">Mileage: {$mileage_value}won</p>
  <p>Shipping: {$delivery}</p>

  <!-- Options -->
  <div module="product_option">
    <select>{$form.option}</select>
  </div>

  <!-- Buy buttons -->
  <div module="product_action">
    <button onclick="{$action_basket}">Add to Cart</button>
    <button onclick="{$action_buy}">Buy Now</button>
    <button onclick="{$action_wishlist}">Wishlist</button>
  </div>
</div>
```

### Board List
```html
<div module="board_title_1002">
  <h2>{$board_name}</h2>
</div>

<table module="board_list_1002">
  <!-- $count = 20 -->
  <tr style="background:{$list_bg_color}">
    <td>{$no}</td>
    <td class="{$category_display|display}">{$category_name}</td>
    <td>
      <a href="{$param_read}" style="color:{$link_color}">
        {$subject} {$icon_new} {$icon_hit}
      </a>
      [{$comment_count}]
    </td>
    <td>{$writer}</td>
    <td class="{$date_display|display}">{$write_date|date:Y.m.d}</td>
    <td class="{$hit_display|display}">{$hit_count}</td>
  </tr>
</table>

<div module="board_paging_1002">
  <a href="{$param_prev}">Prev</a>
  <ol>
    <li><a href="{$param_num}" class="{$param_class}">{$no}</a></li>
  </ol>
  <a href="{$param_next}">Next</a>
</div>
```

### Color Chip
```html
<div module="product_Colorchip">
  <span style="
    background-color:{$color};
    width:20px; height:20px;
    display:inline-block;
    border-radius:50%;
    border:1px solid #ddd;
  "></span>
</div>
```

### Login Form
```html
<div module="member_login">
  <fieldset>
    <input type="text" name="member_id" value="{$form.member_id}" placeholder="ID">
    <input type="password" name="member_passwd" value="{$form.member_passwd}" placeholder="Password">
    <label><input type="checkbox" name="save_id" value="{$form.check_save_id}"> Save ID</label>
    <button onclick="{$action_func_login}">Login</button>
  </fieldset>
  <ul>
    <li><a href="/member/join.html">Sign Up</a></li>
    <li><a href="/member/find_id.html">Find ID</a></li>
    <li><a href="/member/find_passwd.html">Find Password</a></li>
  </ul>
</div>
```

---

## Practical Tips

### Checklist
- Backup skin before editing
- After adding module HTML, verify "use" setting in admin
- In editor: `{$` + Ctrl+Space for variable autocomplete
- Comment options MUST include line breaks
- `.xans-*` classes are auto-generated (add custom classes separately)
- Watch for CSS conflicts when using Bootstrap

### CSS Not Applying Fix
1. Add `?ver=date` to filename
2. Ctrl+F5 hard refresh
3. Delete code -> save -> re-enter

### Recommended Libraries
| Purpose | Recommendation |
|---------|---------------|
| Slider/Carousel | Swiper.js |
| Reviews | Crema Review, Alpha Review |
| Modal/Popup | Vanilla JS or jQuery |

### Recommended Work Order
1. Choose base skin similar to design mockup
2. Edit common layout in `layout.html`
3. Arrange modules & edit variables per page
4. Customize design with CSS
5. Add interactions with JS
6. Verify mobile responsiveness
