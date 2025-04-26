
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EstoqueService } from '../../service/estoque.service';
import { Produto } from '../../../Models/ProdutosResponse';


interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-estoque',
    standalone: true,
    templateUrl: './estoque.component.html',
    styleUrl: './estoque.component.scss',
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule
    ],
    providers: [MessageService, ConfirmationService, EstoqueService]
})
export class EstoqueComponent implements OnInit {

    productDialog: boolean = false;

    produtos = signal<Produto[]>([]);

    produto!: Produto;

    selectedProducts!: Produto[] | null;

    submitted: boolean = false;

    statuses!: any[];

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private estoque: EstoqueService
    ) { }

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {

        this.estoque.obterProdutos(1, 14).subscribe(
            (data) => {
                this.produtos.set(data.produtos);
                console.log('Dados recebidos:', data.produtos);
            },
            (error) => {
                console.error('Erro ao buscar dados:', error);
            }
        );

        this.loadDemoData();
    }

    statusEstoque(quantidade: number): string {
        return quantidade > 0 ? 'Em estoque' : 'Sem estoque';
      }


    loadDemoData() {

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];

        this.cols = [
            { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
            { field: 'nome', header: 'nome' },
            { field: 'imagem', header: 'imagem' },
            { field: 'preco', header: 'preco' },
            { field: 'categoria', header: 'categoria' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.produto = new Produto();
        this.submitted = false;
        this.productDialog = true;
    }

    editProduct(product: Produto) {
        this.produto = { ...product };
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.produtos.set(this.produtos().filter((val) => !this.selectedProducts?.includes(val)));
                this.selectedProducts = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Products Deleted',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    deleteProduct(product: Produto) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.nome + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.produtos.set(this.produtos().filter((val) => val.id !== product.id));
                this.produto = new Produto();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Deleted',
                    life: 3000
                });
            }
        });
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.produtos().length; i++) {
            if (this.produtos()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'Em estoque':
                return 'success';
            case 'Baixo estoque':
                return 'warn';
            case 'Sem estoque':
                return 'danger';
            default:
                return 'info';
        }
    }

    saveProduct() {
        this.submitted = true;
        let _products = this.produtos();
        if (this.produto.nome?.trim()) {
            if (this.produto.id) {
                _products[this.findIndexById(this.produto.id)] = this.produto;
                this.produtos.set([..._products]);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000
                });
            } else {
                this.produto.id = this.createId();
                this.produto.imagem_thumbnail = 'product-placeholder.svg';
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000
                });
                this.produtos.set([..._products, this.produto]);
            }

            this.productDialog = false;
            this.produto = new Produto();
        }
    }

}
