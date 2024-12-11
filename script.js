const addButton = document.getElementById("addButton");
const itemInput = document.getElementById("itemInput");
const priceInput = document.getElementById("priceInput");
const quantityInput = document.getElementById("quantityInput");
const shoppingList = document.getElementById("shoppingList");
const totalPriceElement = document.getElementById("totalPrice");

let items = [];

// Função para renderizar a lista
function renderList() {
  shoppingList.innerHTML = ""; // Limpa a lista antes de renderizar
  let total = 0;

  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity} = R$ ${(item.price * item.quantity).toFixed(2)}</span>
      <div>
        <button class="edit" onclick="editItem(${index})">Editar</button>
        <button class="delete" onclick="deleteItem(${index})">Excluir</button>
      </div>
    `;
    shoppingList.appendChild(li);

    total += item.price * item.quantity; // Soma o preço total do item
  });

  // Atualiza o valor total
  totalPriceElement.textContent = total.toFixed(2);
}

// Função para adicionar um item
function addItem() {
  const newItemName = itemInput.value.trim();
  const newItemPrice = parseFloat(priceInput.value);
  const newItemQuantity = parseInt(quantityInput.value);

  if (
    newItemName &&
    !isNaN(newItemPrice) &&
    newItemPrice > 0 &&
    !isNaN(newItemQuantity) &&
    newItemQuantity > 0
  ) {
    items.push({
      name: newItemName,
      price: newItemPrice,
      quantity: newItemQuantity,
    });
    itemInput.value = "";
    priceInput.value = "";
    quantityInput.value = "";
    renderList();
  } else {
    alert("Por favor, preencha todos os campos corretamente.");
  }
}

// Detecta o clique no botão "Adicionar"
addButton.addEventListener("click", addItem);

// Detecta o pressionamento da tecla "Enter" no campo de entrada
document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Previne o comportamento padrão (ex.: envio de formulário)
    addItem();
  }
});

// Função para editar um item
function editItem(index) {
  const updatedName = prompt("Edite o nome do item:", items[index].name);
  const updatedPrice = parseFloat(prompt("Edite o preço do item:", items[index].price));
  const updatedQuantity = parseInt(prompt("Edite a quantidade do item:", items[index].quantity));

  if (
    updatedName !== null &&
    !isNaN(updatedPrice) &&
    updatedPrice > 0 &&
    !isNaN(updatedQuantity) &&
    updatedQuantity > 0
  ) {
    items[index] = {
      name: updatedName.trim(),
      price: updatedPrice,
      quantity: updatedQuantity,
    };
    renderList();
  } else {
    alert("Por favor, preencha os campos corretamente.");
  }
}

// Função para excluir um item
function deleteItem(index) {
  items.splice(index, 1);
  renderList();
}

// Renderiza a lista inicial
renderList();
