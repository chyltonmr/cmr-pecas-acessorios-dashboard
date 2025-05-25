
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
import { Categoria, Marca, Produto } from '../../../Models/ProdutosResponse';
import { CategoriaService } from '../../service/categoria.service';
import { v4 as uuidv4 } from 'uuid';


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

    categorias: Categoria[] = [];
    marcas: Marca[] = [];

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private estoque: EstoqueService,
        private categoriaService: CategoriaService
    ) { }

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {

        this.loadDemoData();

        this.ObterProdutos(1, 14);

        this.ObterCategorias();
    }

    statusEstoque(quantidade: number): string {
        return quantidade > 0 ? 'Em estoque' : 'Sem estoque';
    }

    ObterProdutos(pageNumber: number, pageSize: number) {
        this.estoque.obterProdutos(pageNumber, pageSize).subscribe(
            (data) => {
                this.produtos.set(data.listObjetos);
                console.log('Dados recebidos:', data.listObjetos);
            },
            (error) => {
                console.error('Erro ao buscar dados:', error);
            }
        );
    }

    ObterCategorias() {
        this.categoriaService.getCategorias()
            .subscribe({
                next: (data) => {
                    console.log('Categorias recebidas do servidor:', data);
                    this.categorias = data.listObjetos;
                },
                error: (err) => console.error('Erro ao carregar categorias', err)
            });
    }

    loadDemoData() {

        this.statuses = [
            { label: 'CCINSTOCK', value: 'instock' },
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
        console.log(product);
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
        let id = uuidv4();
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

        //Atualizar objeto Categoria
        let cat: Categoria | undefined;
        const idx = this.categorias.findIndex(c => c.id === this.produto.categoria.id);
        this.produto.categoria = this.categorias[idx];
        this.produto.id_categoria = this.produto.categoria.id;

        //TODO: DESCOMENTAR AQUI QUANDO JÁ TER FEITO ENDPOINT PARA RECUPERAR MARCAS. DESA FORMAM ESSA PROPRIEDADE 'marcas' ESTARÁ POPULADA
        //Atualizar objeto Marca
        // let marc: Marca | undefined;
        // const idxM = this.marcas.findIndex(c => c.id === this.produto.marca.id);
        // this.produto.marca = this.marcas[idxM];
        // this.produto.id_marca = this.produto.marca.id;

        console.warn(JSON.stringify(this.produto));

        this.submitted = true;
        let _products = this.produtos();

        console.log(this.produto.marca.nome);
        console.log(this.produto.categoria.nome);
        console.log(this.produto.nome);
        console.log(this.produto.precos.preco_pf);
        console.log(this.produto.precos.preco_pj);
        console.log(this.produto.custo.custo);
        console.log(this.produto.estoque);

        if (this.produto.nome?.trim()) {
            alert('Entrou na edicao produto');

            if (this.produto.id) {
                // <-- INÍCIO da lógica alterada para chamada de update
                this.estoque.atualizarProduto(this.produto)
                    .subscribe({
                        next: updated => {
                            const index = this.findIndexById(updated.id);
                            _products[index] = updated;
                            this.produtos.set([..._products]);
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'Product Updated',
                                life: 3000
                            });
                            this.productDialog = false;
                        },
                        error: err => {
                            console.error('Erro ao atualizar produto', err);
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Falha ao atualizar produto',
                                life: 3000
                            });
                        }
                    });
                // <-- FIM da lógica alterada
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
                this.productDialog = false;
            }
        }
    }
}


