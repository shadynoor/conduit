import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormBuilderModule, FormConfig } from 'form-builder-dynamically';
import { FormGroup, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AddPostService } from '../services/add-post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  standalone: true,
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss',
  imports: [CommonModule, DynamicFormBuilderModule, FormsModule],
})
export class AddPostComponent {
  title: FormConfig = {
    name: 'title',
    type: 'text',
    id: 'title',
    label: 'Article Title',
    isRequired: true,
    placeholder: 'Title',
  };
  description: FormConfig = {
    name: 'description',
    type: 'textarea',
    id: 'description',
    label: 'Article Description',
    isRequired: true,
    placeholder: 'Description',
  };
  body: FormConfig = {
    name: 'body',
    type: 'textarea',
    id: 'body',
    label: 'Article Body',
    isRequired: true,
    placeholder: 'body',
  };

  tags: FormConfig = {
    name: 'tags',
    type: 'text',
    id: 'tags',
    label: 'Article tags',
    isRequired: false,
    placeholder: 'Write tags and between each tag a space',
  };

  addArticleService = inject(AddPostService);
  router = inject(Router);

  myInputs = [this.title, this.description, this.body, this.tags];
  getFormValue(form: FormGroup) {
    const article = {
      title: form.value.title,
      description: form.value.description,
      body: form.value.body,
      tags: form.value.tags.split(' '),
    };

    this.addArticleService.addArticle(article).subscribe((res) => {
      this.router.navigate(['/articles/' + res.article.slug]);
    });
  }
}
