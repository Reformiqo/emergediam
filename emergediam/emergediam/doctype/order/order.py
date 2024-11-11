# Copyright (c) 2024, erpera and contributors
# For license information, please see license.txt

import frappe
from frappe.utils import nowdate, now, today, add_days, flt
from frappe.model.document import Document
import erpnext


class Order(Document):
	def validate(self):
		self.create_sales_order()
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
			doc.append("items", {
				"item_code": item.item,
				"delivery_date": today(),
				"qty": 1,
				"rate": flt(frappe.db.get_value("Item Price", {"item_code": item.item}, "price_list_rate")),
				"amount": 1 * flt(frappe.db.get_value("Item Price", {"item_code": item.item}, "price_list_rate")),
				"custom_type": item.type,
				"custom_shape": item.shape,
				"custom_color": item.color,
				"custom_calarity": item.calarity,
				"custom_cuts": item.cuts,
				"custom_size_sieve_": item.sieve,
				# "custom_size_ct": item.ct,
				# "custom_size_mm": item.mm,
				"custom_certificate":item.certificate
			})
		doc.insert(ignore_permissions=True)
		# doc.submit()
		
		frappe.db.set_value("Order", self.name, "sales_order", doc.name)
		frappe.db.commit()
	
		