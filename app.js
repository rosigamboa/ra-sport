// R&A SPORT — catálogo de demostración. Editá los productos y precios en esta lista.
const products = [
  {id:1,name:"Phantom Luna Pro",category:"Botines",price:105000,emoji:"👟",tag:"DESTACADO",detail:"Control y precisión"},
  {id:2,name:"Tiempo Legend",category:"Botines",price:115000,emoji:"⚽",tag:"TOP VENTAS",detail:"Toque clásico"},
  {id:3,name:"Chomba River Plate",category:"Camisetas",price:42000,emoji:"👕",tag:"NUEVO",detail:"Estilo futbolero"},
  {id:4,name:"Chomba Boca Juniors",category:"Camisetas",price:42000,emoji:"👕",tag:"NUEVO",detail:"Pasión xeneize"},
  {id:5,name:"New Balance 9060",category:"Zapatillas",price:95000,emoji:"👟",tag:"URBAN",detail:"Comodidad diaria"},
  {id:6,name:"Botines Future",category:"Botines",price:99000,emoji:"🥅",tag:"PROMO",detail:"Velocidad y agilidad"}
];
const money = n => new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS",maximumFractionDigits:0}).format(n);
let cart = JSON.parse(localStorage.getItem("raSportCart") || "[]");
let activeCategory = "Todos";
const grid = document.getElementById("productGrid");
const toastEl = document.getElementById("toast");

function showToast(message){toastEl.textContent=message;toastEl.classList.add("show");setTimeout(()=>toastEl.classList.remove("show"),2100)}
function saveCart(){localStorage.setItem("raSportCart",JSON.stringify(cart));renderCart()}
function renderProducts(){
  const query=document.getElementById("searchInput").value.trim().toLowerCase();
  const filtered=products.filter(p=>(activeCategory==="Todos"||p.category===activeCategory)&&(p.name+" "+p.category+" "+p.detail).toLowerCase().includes(query));
  document.getElementById("resultCount").textContent=`${filtered.length} producto${filtered.length===1?"":"s"}`;
  grid.innerHTML=filtered.length?filtered.map(p=>`<article class="product-card"><div class="product-visual"><span class="product-label">${p.tag}</span><span class="product-emoji">${p.emoji}</span></div><div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-btn" data-add="${p.id}" aria-label="Agregar ${p.name}">+</button></div></div></article>`).join(""):`<div class="empty-state">No encontramos productos con esa búsqueda.<br>Probá con otra palabra o categoría.</div>`;
}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});saveCart();showToast("¡Producto agregado al carrito!")}
function renderCart(){
  const count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+x.qty*products.find(p=>p.id===x.id).price,0);
  document.getElementById("cartCount").textContent=count;document.getElementById("cartTotal").textContent=money(total);
  document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>{const p=products.find(p=>p.id===x.id);return `<div class="cart-row"><div class="cart-thumb">${p.emoji}</div><div><h4>${p.name}</h4><small>${money(p.price)} c/u</small><div class="quantity"><button data-dec="${p.id}" aria-label="Restar">−</button><span>${x.qty}</span><button data-inc="${p.id}" aria-label="Sumar">+</button></div></div><button class="remove-btn" data-remove="${p.id}">Quitar</button></div>`}).join(""):`<div class="empty-state">Tu carrito está vacío.<br>¡Agregá productos para empezar!</div>`;
  document.getElementById("checkoutBtn").disabled=!cart.length;
}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").classList.add("show");document.getElementById("cartDrawer").setAttribute("aria-hidden","false")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("overlay").classList.remove("show");document.getElementById("cartDrawer").setAttribute("aria-hidden","true")}
grid.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)addToCart(Number(b.dataset.add))});
document.getElementById("cartItems").addEventListener("click",e=>{const id=Number(e.target.dataset.inc||e.target.dataset.dec||e.target.dataset.remove);if(!id)return;if(e.target.dataset.remove){cart=cart.filter(x=>x.id!==id)}else{const item=cart.find(x=>x.id===id);item.qty+=e.target.dataset.inc?1:-1;if(item.qty<1)cart=cart.filter(x=>x.id!==id)}saveCart()});
document.getElementById("searchInput").addEventListener("input",renderProducts);
document.querySelector(".filters").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts()});
document.getElementById("openCart").addEventListener("click",openCart);document.getElementById("closeCart").addEventListener("click",closeCart);document.getElementById("overlay").addEventListener("click",closeCart);
document.getElementById("checkoutBtn").addEventListener("click",async()=>{
  const lines=cart.map(x=>{const p=products.find(p=>p.id===x.id);return `• ${p.name} x${x.qty} — ${money(p.price*x.qty)}`});
  const total=cart.reduce((s,x)=>s+x.qty*products.find(p=>p.id===x.id).price,0);
  const message=`Hola R&A SPORT, quiero consultar por este pedido:\n${lines.join("\n")}\n\nTotal estimado: ${money(total)}\n¿Me confirman disponibilidad y medios de pago?`;
  try{await navigator.clipboard.writeText(message);showToast("Pedido copiado. Pegalo en el WhatsApp de la tienda.");}catch(e){window.prompt("Copiá tu pedido:",message)}
});
renderProducts();renderCart();
if("serviceWorker" in navigator && location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(console.error))}
