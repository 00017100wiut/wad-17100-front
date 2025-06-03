import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from './create-edit-dialog/product.component';
import { Product, ProductService } from './service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    ProductDialogComponent,
  ],
})
export class AppComponent implements OnInit {
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);

  displayedColumns = ['id', 'name', 'price', 'details', 'sku', 'actions'];
  products: Product[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products', err);
        this.loading = false;
      },
    });
  }

  openDialog(product?: Product): void {
    const ref = this.dialog.open(ProductDialogComponent, {
      width: '500px',
      data: product
        ? { ...product }
        : { id: 0, name: '', price: 0, details: '', sku: 0 },
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id === 0) {
          this.productService
            .createProduct(result)
            .subscribe(() => this.loadProducts());
        } else {
          this.productService
            .editProduct(result)
            .subscribe(() => this.loadProducts());
        }
      }
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService
        .deleteProduct(id)
        .subscribe(() => this.loadProducts());
    }
  }
}
