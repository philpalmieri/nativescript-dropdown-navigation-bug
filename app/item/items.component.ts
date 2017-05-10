import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";


import { Item } from "./item";
import { ItemService } from "./item.service";
import { SelectedIndexChangedEventData, ValueList } from "nativescript-drop-down";


@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];
    public itemList: ValueList<Object>;
    public selectedIndex: number = 0;

    constructor(private itemService: ItemService,
                private router: Router) {
        this.itemList = new ValueList<Object>();
    }

    onchange(args: SelectedIndexChangedEventData) {
        console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
        for(let item of this.items) {
            if(this.itemList[args.newIndex].display == item.name) {
                this.router.navigate(["/item", item.id]);
            }
        }
    }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
        for(let item of this.items) {
            this.itemList.push({
                value: item.id,
                display: item.name
            });
        }
    }
}
