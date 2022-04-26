import { format, parseISO } from "date-fns"

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


const $itemTableBody = document.querySelector("#item-table-body")
const $form = document.querySelector("form")

const today = format(new Date(), "D", { useAdditionalDayOfYearTokens: true })



$form.addEventListener("submit", event => {
    event.preventDefault()
    $itemTableBody.innerHTML = ``
    const formdata = new FormData(event.target)
    const itemObject = {
        name: formdata.get("item-name"),
        sellIn: formdata.get("item-sell-in"),
        quality: formdata.get("item-quality"),
        dateAdded: format(parseISO(formdata.get("item-receipt-date")), "D", { useAdditionalDayOfYearTokens: true })
    }
    itemList.push(itemObject)
    itemList.forEach(item => {
        addItemListingToPage(createItemListing(item))
    })
    event.target.reset()
})

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
    $itemTableBody.append(itemListing)
}

