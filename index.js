let itemList = [
    {
        name: "+5 Dexterity Vest",
        sellIn: 10,
        quality: 20,
    },
    {
        name: "Aged Brie",
        sellIn: 2,
        quality: 0,
    },
    {
        name: "Elixir of the Mongoose",
        sellIn: 5,
        quality: 7,
    },
    {
        name: "Sulfuras, Hand of Ragnaros",
        sellIn: 0,
        quality: 80,
    },
    {
        name: "Backstage passes to a TAFKAL80ETC concert",
        sellIn: 15,
        quality: 20,
    },
    {
        name: "Conjured Mana Cake",
        sellIn: 3,
        quality: 6,
    }
]

let itemObject = {
    name: "",
    sellIn: 0,
    quality: 0,
}

const $itemTable = document.querySelector("#item-table")

itemList.forEach(item => {
    addItemListingToPage(createItemListing(item))
})

function createItemListing(item) {
    const $itemListing = document.createElement("tr")
    $itemListing.classList.add("item-listing")
    $itemListing.innerHTML = `
        <td>${item.name}</td>
        <td>${item.sellIn}</td>
        <td>${item.quality}</td>
    `
    return $itemListing
}


function addItemListingToPage(itemListing) {
    $itemTable.append(itemListing)
}

