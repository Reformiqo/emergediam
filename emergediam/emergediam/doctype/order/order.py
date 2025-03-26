# Copyright (c) 2024, erpera and contributors
# For license information, please see license.txt

import frappe
from frappe.utils import nowdate, now, today, add_days, flt
from frappe.model.document import Document
import erpnext


class Order(Document):
    def validate(self):
        self.process_tables()

    def create_sales_order(self):
        doc = frappe.new_doc("Sales Order")
        if frappe.db.exists("Customer", self.company_name):
            customer = frappe.get_doc("Customer", self.company_name)
        else:
            customer = frappe.new_doc("Customer")
            customer.customer_name = self.company_name
            customer.customer_group = "All Customer Groups"
            customer.customer_type = "Individual"
            customer.insert(ignore_permissions=True)
            frappe.db.commit
        doc.customer = customer.name
        doc.transaction_date = today()
        doc.delivery_date = today()

        doc.due_date = add_days(today(), 1)

        doc.company = erpnext.get_default_company()
        for item in self.items:
            doc.append(
                "items",
                {
                    "item_code": item.item,
                    "delivery_date": today(),
                    "qty": 1,
                    "rate": flt(
                        frappe.db.get_value(
                            "Item Price", {"item_code": item.item}, "price_list_rate"
                        )
                    ),
                    "amount": 1
                    * flt(
                        frappe.db.get_value(
                            "Item Price", {"item_code": item.item}, "price_list_rate"
                        )
                    ),
                    "custom_type": item.type,
                    "custom_shape": item.shape,
                    "custom_color": item.color,
                    # "custom_calarity": item.calarity,
                    "custom_cuts": item.cuts,
                    "custom_size_sieve_": item.sieve,
                    # "custom_size_ct": item.ct,
                    # "custom_size_mm": item.mm,
                    # "custom_certificate":item.certificate
                },
            )
        doc.insert(ignore_permissions=True)
        # doc.submit()

        frappe.db.set_value("Order", self.name, "sales_order", doc.name)
        frappe.db.commit()

    def process_tables(self):
        self.oval_pricing_table = []
        self.order_by_mm__pricing_table = []
        self.order_by_pointer__pricing_table = []
        self.order_by_sieve__pricing_table = []
        self.marquise_pricing_table = []
        self.pear_pricing_table = []
        self.emerald_pricing_table = []
        self.princess_pricing_table = []
        self.radiant_pricing_table = []
        self.trillion_pricing_table = []
        self.trapezoid_pricing_table = []
        self.tapered_baguette_pricing_table = []
        self.baguette_pricing_table = []
        self.any_other_pricing_table = []

        for item in self.oval_table:
            self.append(
                "oval_pricing_table",
                {
                    "order_id": item.order_id,
                    "order_type": item.order_type,
                    "delivery_date": item.delivery_date,
                    "quantity_cts": item.carat_quantity,
                    "quantity_pcs": item.pcs_quantity,
                    "quality": item.quality,
                },
            )

        for item in self.marquise_table:
            self.append(
                "marquise_pricing_table",
                {
                    "order_id": item.order_id,
                    "order_type": item.order_type,
                    "delivery_date": item.delivery_date,
                    "quantity_cts": item.carat_quantity,
                    "quantity_pcs": item.carat_quantity,
                    "quality": item.quality,
                },
            )

        for item in self.order_by_pointer_table:
            self.append(
                "order_by_pointer__pricing_table",
                {
                    "order_id": item.order_id,
                    "order_type": item.order_type,
                    "delivery_date": item.delivery_date,
                    "quantity_cts": item.quantity_cts,
                    "quantity_pcs": item.quantity_pcs,
                    "quality": item.quality,
                },
            )

        for item in self.order_by_sieve_table:
            self.append(
                "order_by_sieve__pricing_table",
                {
                    "order_id": item.order_id,
                    "order_type": item.order_type,
                    "delivery_date": item.delivery_date,
                    "quantity_cts": item.quantity_cts,
                    "quantity_pcs": item.quantity_pcs,
                    "quality": item.quality,
                },
            )
        for item in self.order_by_mm_table:
            self.append(
                "order_by_mm__pricing_table",
                {
                    "order_id": item.order_id,
                    "order_type": item.order_type,
                    "delivery_date": item.delivery_date,
                    "quantity_cts": item.quantity_cts,
                    "quantity_pcs": item.quantity_pcs,
                    "quality": item.quality,
                },
            )
        
        
        for item in self.pear_table:
            self.append(
                "pear_pricing_table",
                {
                    "order_id": item.order_id,
                    "order_type": item.order_type,
                    "delivery_date": item.delivery_date,
                    "quantity_cts": item.carat_quantity,
                    "quantity_pcs": item.carat_quantity,
                    "quality": item.quality,
                },
            )

        for item in self.emerald_table:
            self.append(
                "emerald_pricing_table",
                {
                    "order_id": item.order_id,
                    "order_type": item.order_type,
                    "delivery_date": item.delivery_date,
                    "quantity_cts": item.carat_quantity,
                    "quantity_pcs": item.carat_quantity,
                    "quality": item.quality,
                },
            )

        for item in self.princess_table:
            self.append(
                "princess_pricing_table",
                {
                    "order_id": item.order_id,
                    "order_type": item.order_type,
                    "delivery_date": item.delivery_date,
                    "quantity_cts": item.carat_quantity,
                    "quantity_pcs": item.carat_quantity,
                    "quality": item.quality,
                },
            )

        for item in self.radiant_table:
            self.append(
                "radiant_pricing_table",
                {
                    "order_id": item.order_id,
                    "order_type": item.order_type,
                    "delivery_date": item.delivery_date,
                    "quantity_cts": item.carat_quantity,
                    "quantity_pcs": item.carat_quantity,
                    "quality": item.quality,
                },
            )

        for item in self.trillion_table:
            self.append(
                "trillion_pricing_table",
                {
                    "order_id": item.order_id,
                    "order_type": item.order_type,
                    "delivery_date": item.delivery_date,
                    "quantity_cts": item.carat_quantity,
                    "quantity_pcs": item.carat_quantity,
                    "quality": item.quality,
                },
            )

        for item in self.trapezoid_table:
            self.append(
                "trapezoid_pricing_table",
                {
                    "order_id": item.order_id,
                    "order_type": item.order_type,
                    "delivery_date": item.delivery_date,
                    "quantity_cts": item.carat_quantity,
                    "quantity_pcs": item.carat_quantity,
                    "quality": item.quality,
                },
            )

        for item in self.tapered_baguette_table:
            self.append(
                "tapered_baguette_pricing_table",
                {
                    "order_id": item.order_id,
                    "order_type": item.order_type,
                    "delivery_date": item.delivery_date,
                    "quantity_cts": item.carat_quantity,
                    "quantity_pcs": item.carat_quantity,
                    "quality": item.quality,
                },
            )

        for item in self.baguette_table:
            self.append(
                "baguette_pricing_table",
                {
                    "order_id": item.order_id,
                    "order_type": item.order_type,
                    "delivery_date": item.delivery_date,
                    "quantity_cts": item.carat_quantity,
                    "quantity_pcs": item.carat_quantity,
                    "quality": item.quality,
                },
            )

        for item in self.any_other_table:
            self.append(
                "any_other_pricing_table",
                {
                    "order_id": item.order_id,
                    "order_type": item.order_type,
                    "delivery_date": item.delivery_date,
                    "quantity_cts": item.carat_quantity,
                    "quantity_pcs": item.carat_quantity,
                    "quality": item.quality,
                },
            )

@frappe.whitelist()
def get_table_data(fancy, size):
    fancy  = frappe.get_doc("Fancy", fancy)
    data = []
    for item in fancy.fancy:
        if item.size == size:
            data.append({
                "mm": item.mm,
                "avg_pts": item.avg_pts,
                "quality": item.quality,
            })
    return data
