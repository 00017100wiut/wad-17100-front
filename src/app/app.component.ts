import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

const baseUrl = 'https://localhost:7147/api/';

export interface Product {
  id: number;
  name: string;
  price: number;
  details: string;
  sku: number;
}

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
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);

  displayedColumns = ['id', 'name', 'price', 'details', 'sku', 'actions'];
  products: Product[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.http.get<Product[]>(baseUrl + 'products').subscribe({
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
      width: '400px',
      data: product
        ? { ...product }
        : { id: 0, name: '', price: 0, details: '', sku: 0 },
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id === 0) {
          this.http
            .post(baseUrl + 'products', result)
            .subscribe(() => this.loadProducts());
        } else {
          this.http
            .put(baseUrl + 'products', result)
            .subscribe(() => this.loadProducts());
        }
      }
    });
  }
}
