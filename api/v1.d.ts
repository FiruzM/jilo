/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/admin/users': {
    /** GetAllProducts */
    get: {
      parameters: {
        query: {
          /** email */
          email?: string
          /** id */
          id?: number
          /** fullName */
          fullName?: string
          /** numberPhone */
          numberPhone?: string
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['models.Response']
        }
      }
    }
    /** UpdateUsers */
    put: {
      parameters: {
        formData: {
          email?: string
          file_path?: string
          full_name?: string
          id?: number
          number_phone?: string
          password?: string
          repeat_password?: string
          role?: number
          /** User avatar */
          avatar?: unknown
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['models.Response']
        }
      }
    }
    /** AddUsers */
    post: {
      parameters: {
        body: {
          /** auth */
          auth: definitions['models.AddUserParams']
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['models.Response']
        }
      }
    }
  }
  '/app/brands': {
    /** AddBrands */
    post: {
      parameters: {
        body: {
          /** auth */
          auth: definitions['models.Brands']
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['models.Response']
        }
      }
    }
  }
  '/app/brands/all': {
    /** GetAllBrands */
    get: {
      parameters: {
        body: {
          /** auth */
          auth: definitions['models.Brands']
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['models.Response']
        }
      }
    }
  }
  '/app/categories': {
    /** AddCategories */
    post: {
      parameters: {
        body: {
          /** auth */
          auth: definitions['models.Categories']
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['models.Response']
        }
      }
    }
  }
  '/app/categories/all': {
    /** GetAllCategories */
    get: {
      responses: {
        /** OK */
        200: {
          schema: definitions['models.Response']
        }
      }
    }
  }
  '/app/color': {
    /** AddColor */
    post: {
      parameters: {
        body: {
          /** auth */
          auth: definitions['models.Color']
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['models.Response']
        }
      }
    }
  }
  '/app/color/all': {
    /** GetAllColor */
    get: {
      parameters: {
        body: {
          /** auth */
          auth: definitions['models.Color']
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['models.Response']
        }
      }
    }
  }
  '/app/material/all': {
    /** GetAllMaterials */
    get: {
      parameters: {
        body: {
          /** auth */
          auth: definitions['models.Materials']
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['models.Response']
        }
      }
    }
  }
  '/app/products': {
    /** models.Products */
    post: {
      parameters: {
        formData: {
          /** Product Name */
          name: string
          /** Product Price */
          price: number
          /** Old Price */
          old_price?: number
          /** Inventory Number */
          inventory_number: string
          /** Color ID */
          color_id: number
          /** Size ID */
          size_id: number
          /** Brand ID */
          brands_id: number
          /** Status ID */
          status_id: number
          /** Product Files */
          files: unknown
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['models.Response']
        }
        /** Created */
        201: {
          schema: definitions['models.Products']
        }
      }
    }
  }
  '/app/products/all': {
    /** Get all products with optional filters */
    get: {
      parameters: {
        query: {
          /** Name */
          name?: string
          /** Color ID */
          color_id?: number
          /** Size ID */
          size_id?: number
          /** Brand ID */
          brand_id?: number
          /** Status ID */
          status_id?: number
          /** Inventory Number */
          inventory_number?: string
          /** Minimum Price */
          min_price?: number
          /** Maximum Price */
          max_price?: number
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['models.Response']
        }
      }
    }
  }
  '/app/products/{id}': {
    /** UpdateProduct */
    put: {
      parameters: {
        formData: {
          /** Product ID */
          id: number
          /** Product Name */
          name?: string
          /** Product Price */
          price?: number
          /** Old Price */
          old_price?: number
          /** Inventory Number */
          inventory_number?: string
          /** Color ID */
          color_id?: number
          /** Size ID */
          size_id?: number
          /** Brand ID */
          brands_id?: number
          /** Status ID */
          status_id?: number
          /** Product Files */
          files?: unknown
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['models.Response']
        }
      }
    }
    /** DeleteProduct */
    delete: {
      parameters: {
        path: {
          /** Product ID */
          id: number
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['models.Response']
        }
      }
    }
  }
  '/app/roles': {
    /** GetRoles */
    get: {
      responses: {
        /** OK */
        200: {
          schema: definitions['models.Response']
        }
      }
    }
  }
  '/app/size': {
    /** AddSize */
    post: {
      parameters: {
        body: {
          /** auth */
          auth: definitions['models.Size']
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['models.Response']
        }
      }
    }
  }
  '/app/size/all': {
    /** GetAllSize */
    get: {
      parameters: {
        body: {
          /** auth */
          auth: definitions['models.Size']
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['models.Response']
        }
      }
    }
  }
  '/app/status': {
    /** AddStatuses */
    post: {
      parameters: {
        body: {
          /** auth */
          auth: definitions['models.Statuses']
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['models.Response']
        }
      }
    }
  }
  '/app/status/all': {
    /** GetAllStatuses */
    get: {
      parameters: {
        body: {
          /** auth */
          auth: definitions['models.Statuses']
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['models.Response']
        }
      }
    }
  }
  '/app/subcategories': {
    /** AddSubcategories */
    post: {
      parameters: {
        body: {
          /** auth */
          auth: definitions['models.Subcategories']
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['models.Response']
        }
      }
    }
  }
  '/app/subcategories/all': {
    /** GetAllSubcategories */
    get: {
      responses: {
        /** OK */
        200: {
          schema: definitions['models.Response']
        }
      }
    }
  }
  '/auth/sign-in': {
    /** SignIn */
    post: {
      parameters: {
        body: {
          /** auth */
          auth: definitions['models.UserLogin']
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['models.ResponseUser']
        }
      }
    }
  }
  '/auth/sign-up': {
    /** SignUp */
    post: {
      parameters: {
        body: {
          /** auth */
          auth: definitions['models.UserParams']
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions['models.Response']
        }
      }
    }
  }
  '/ping': {
    /** ping service */
    get: {
      responses: {
        /** Ok */
        200: unknown
      }
    }
  }
  '/profile/users': {
    /** GetCurrentUsers */
    get: {
      responses: {
        /** OK */
        200: {
          schema: definitions['models.Response']
        }
      }
    }
  }
}

export interface definitions {
  'models.AddUserParams': {
    email?: string
    file_path: string
    full_name?: string
    id?: number
    number_phone?: string
    password?: string
    repeat_password?: string
    role?: {
      id?: number
      name?: string
    }
  }
  'models.Brands': {
    subcategories_id?: number
    created_at?: string
    id?: number
    name?: string
    updated_at?: string
  }
  'models.Categories': {
    created_at?: string
    id?: number
    name?: string
    updated_at?: string
    file?: string
    file_path?: string
    category_id?: string
    subcategory_id?: string
  }
  'models.Color': {
    created_at?: string
    id?: number
    name?: string
    updated_at?: string
  }
  'models.Materials': {
    created_at?: string
    id?: number
    name?: string
    updated_at?: string
  }
  'models.Products': {
    quantity?: number
    description?: string
    favorite?: boolean
    /** @description The brand ID of the product */
    brands_id?: number
    /** @description The category ID of the product */
    category_id?: number
    /** @description The subcategory ID of the product */
    subcategory_id?: number
    /** @description The color ID of the product */
    color_id?: number
    /** @description The creation time of the product */
    created_at?: string
    /** @description A list of file paths associated with the product */
    file_paths?: Array
    /** @description The unique ID of the product */
    id?: number
    /** @description The inventory number of the product */
    inventory_number?: string
    /** @description The name of the product */
    name?: string
    /** @description The old price of the product */
    old_price?: number
    /** @description The price of the product */
    price?: number
    /** @description The size ID of the product */
    size_id?: number
    /** @description The status ID of the product */
    status_id?: number
    /** @description The last update time of the product */
    updated_at?: string
  }
  'models.Response': {
    code?: number
    message?: string
    payload?: unknown
  }
  'models.ResponseUser': {
    id?: number
    role?: number
    token?: string
  }
  'models.Size': {
    created_at?: string
    id?: number
    name?: string
    updated_at?: string
  }
  'models.Statuses': {
    created_at?: string
    id?: number
    name?: string
    updated_at?: string
  }
  'models.Subcategories': {
    categories_id?: number
    created_at?: string
    id?: number
    name?: string
    updated_at?: string
  }
  'models.UserLogin': {
    /** @description В поля логин вводите email или номер телефон */
    login?: string
    /** @description Длина пароля не должно быть меньше */
    password?: string
  }
  'models.UserParams': {
    email?: string
    full_name?: string
    number_phone?: string
    password?: string
    repeat_password?: string
  }
}

export interface operations {}

export interface external {}
