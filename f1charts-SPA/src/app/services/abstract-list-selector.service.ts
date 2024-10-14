import { Subject } from 'rxjs';

export interface SelectorItem {
  id: string;
  name: string;
}

export interface ListItem extends SelectorItem {
  component: any;
}

export abstract class AbstractListSelectorService {
  protected DEFAULT_NAME = "Default";
  protected abstract items: ListItem[];
  protected abstract optionChanged: Subject<ListItem[]>;
  protected abstract websiteStateLoaded: Subject<ListItem[]>;

  protected getInitialListItem(): ListItem[] {
    return [{ id: this.generateUniqueId(), name: this.DEFAULT_NAME, component: null }];
  }

  private updateItems() {
    this.optionChanged.next(this.items);
  }

  abstract getOptionsChangedSubject(): Subject<ListItem[]>;
  abstract getWebsiteStateLoadedSubject(): Subject<ListItem[]>;

  getItems(): ListItem[] {
    return this.items;
  }

  updateItemComponentReference(component: any) {
    const item = this.getItemById(component.id);
    item.component = component;
  }

  addItem(newListItem: ListItem) {
    this.items.push(newListItem);
    this.updateItems();
  }

  deleteItem(id: string) {
    const idx = this.items.findIndex((item) => item.id === id);
    if (idx < 0) throw AbstractListSelectorService.getIDNotFoundError(id);
    this.items.splice(idx, 1);
    this.updateItems();
  }

  getItemById(id: string): ListItem {
    const matchingItem = this.items.find((item) => item.id === id);
    if (!matchingItem) throw AbstractListSelectorService.getIDNotFoundError(id);
    return matchingItem;
  }

  getItemByName(name: string): ListItem {
    const matchingItem = this.items.find((item) => item.name === name);
    if (!matchingItem) throw AbstractListSelectorService.getIDNotFoundError(name);
    return matchingItem;
  }

  updateItemName(name: string, id: string) {
    const matchingItem = this.getItemById(id);
    matchingItem.name = name;
    this.updateItems();
  }

  private generateUniqueId(): string {
    // Implement your unique ID generation logic here
    return 'unique-id';
  }

  private static getIDNotFoundError(id: string): Error {
    return new Error(`Item with ID ${id} not found`);
  }
}
