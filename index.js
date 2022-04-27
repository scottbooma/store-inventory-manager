import { format, parseISO } from "date-fns"

const today = format(new Date(), "D", { useAdditionalDayOfYearTokens: true })

let itemList = [
    {
        name: "+5 Dexterity Vest",
        sellIn: 10,
        quality: 20,
        dateAdded: today,
    },
    {
        name: "Aged Brie",
        sellIn: 2,
        quality: 0,
        dateAdded: today,
    },
    {
        name: "Elixir of the Mongoose",
        sellIn: 5,
        quality: 7,
        dateAdded: today,
    },
    {
        name: "Sulfuras, Hand of Ragnaros",
        sellIn: 0,
        quality: 80,
        dateAdded: today,
    },
    {
        name: "Backstage passes to a TAFKAL80ETC concert",
        sellIn: 15,
        quality: 20,
        dateAdded: today,
    },
    {
        name: "Conjured Mana Cake",
        sellIn: 3,
        quality: 6,
        dateAdded: today,
    }
]


const $itemTableBody = document.querySelector("#item-table-body")
const $form = document.querySelector("form")



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
        addItemListingToPage(createItemListing(sellInDegradation(item)))
    })
    event.target.reset()
})

itemList.forEach(item => {
    addItemListingToPage(createItemListing(sellInDegradation(item)))
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

function sellInDegradation(item) {
    if (item.name.includes("Sulfuras")) {
        item.quality = 80
        return item
    } else {
        item.sellIn = item.sellIn - (today - item.dateAdded)
        return item
    }
}

function double(number) {
    return number * 2
}

function triple(number) {
    return number * 3
}

// if (item.name.includes("Aged Brie")) {
//     item.sellIn = item.sellIn - (today - item.dateAdded)
//     item.quality = item.quality + (today - item.dateAdded)
//     return item
// } else if (item.name.includes("Conjured")) {
//     item.sellIn = item.sellIn - (today - item.dateAdded)
//     item.quality = item.quality - double(today - item.dateAdded)
//     return item
// } else if (item.name.includes("backstage pass")) {
//     if (item.sellIn > 10) {
//         item.sellIn = item.sellIn - (today - item.dateAdded)
//         item.quality = item.quality + (today - item.dateAdded)
//         return item
//     } else if (item.sellIn <= 10 && item.sellIn > 5) {
//         item.sellIn = item.sellIn - (today - item.dateAdded)
//         item.quality = item.quality + double(today - item.dateAdded)
//         return item
//     } else if (item.sellIn <= 5 && item.sellIn > 0) {
//         item.sellIn = item.sellIn - (today - item.dateAdded)
//         item.quality = item.quality + triple(today - item.dateAdded)
//         return item
//     } else {
//         item.sellIn = item.sellIn - (today - item.dateAdded)
//         item.quality = 0
//         return item
//     }
// } else {
//     item.sellIn = item.sellIn - (today - item.dateAdded)
//     item.quality = item.quality - (today - item.dateAdded)
//     return item
// }