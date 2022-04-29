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
        sellIn: +formdata.get("item-sell-in"),
        quality: +formdata.get("item-quality"),
        dateAdded: format(parseISO(formdata.get("item-receipt-date")), "D", { useAdditionalDayOfYearTokens: true })
    }
    itemList.push(itemObject)
    itemList.forEach(item => {
        addItemListingToPage(createItemListing(degradation(item)))
    })
    event.target.reset()
})

itemList.forEach(item => {
    addItemListingToPage(createItemListing(degradation(item)))
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

function qualityAssurance(quality) {
    if (quality > 50) {
        return quality = 50
    } else if (quality < 0) {
        return quality = 0
    }
    return quality
}

function standardDegradation(item) {
    item.sellIn = item.sellIn - (today - item.dateAdded)
    item.quality = qualityAssurance(item.quality - (today - item.dateAdded))
    return item
}

function agedBrieDegradation(item) {
    item.sellIn = item.sellIn - (today - item.dateAdded)
    item.quality = qualityAssurance(item.quality + (today - item.dateAdded))
    return item
}

function sulfurasDegradation(item) {
    item.quality = 80
    return item
}

function conjuredDegradation(item) {
    item.sellIn = item.sellIn - (today - item.dateAdded)
    item.quality = qualityAssurance(item.quality - double(today - item.dateAdded))
    return item
}

function backstagePassDegradation(item) {
    const newSellIn = item.sellIn - (today - item.dateAdded)
    if (item.sellIn > 10 && newSellIn > 10) {
        item.sellIn = newSellIn
        item.quality = qualityAssurance(item.quality + (today - item.dateAdded))
        return item
    } else if ((item.sellIn <= 10 && item.sellIn > 5) && (newSellIn <= 10 && newSellIn > 5)) {
        item.sellIn = newSellIn
        item.quality = qualityAssurance(item.quality + double(today - item.dateAdded))
        return item
    } else if ((item.sellIn <= 5 && item.sellIn > 0) && (newSellIn <= 5 && newSellIn > 0)) {
        item.sellIn = newSellIn
        item.quality = qualityAssurance(item.quality + triple(today - item.dateAdded))
        return item
    } else if (item.sellIn <= 0 || newSellIn <= 0) {
        item.sellIn = newSellIn
        item.quality = 0
        return item
    } else if (item.sellIn > 10 && (newSellIn <= 10 && newSellIn > 5)) {
        item.quality = qualityAssurance(item.quality + (item.sellIn - 10) + double(10 - newSellIn))
        item.sellIn = newSellIn
        return item
    } else if (item.sellIn > 10 && (newSellIn <= 5 && newSellIn > 0)) {
        item.quality = qualityAssurance(item.quality + (item.sellIn - 10) + 10 + triple(5 - newSellIn))
        item.sellIn = newSellIn
        return item
    } else if ((item.sellIn <= 10 && item.sellIn > 5) && (newSellIn <= 5 && newSellIn > 0)) {
        item.quality = qualityAssurance(item.quality + double(item.sellIn - 5) + triple(5 - newSellIn))
        item.sellIn = newSellIn
        return item
    } else return item
}

function degradation(item) {
    if (item.name.includes("Aged Brie")) {
        return agedBrieDegradation(item)
    } else if (item.name.includes("Sulfuras")) {
        return sulfurasDegradation(item)
    } else if (item.name.includes("Conjured")) {
        return conjuredDegradation(item)
    } else if (item.name.includes("Backstage pass")) {
        return backstagePassDegradation(item)
    } else {
        return standardDegradation(item)
    }
}

function double(number) {
    return number * 2
}

function triple(number) {
    return number * 3
}
