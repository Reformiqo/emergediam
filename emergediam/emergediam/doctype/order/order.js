// Copyright (c) 2024, erpera and contributors
// For license information, please see license.txt

frappe.ui.form.on('Order', {
    // Function to hide all tables
    hide_all_tables: function(frm) {
        // List all your tables here
        const all_tables = [
            "emerald_table",
            "oval_table",
            "pear_table",
            "marquise_table",
            "princess_table",
            "radiant_table",
            "any_other_table",
            "trillion_tabl",
			"order_by_mm_table",
			"order_by_pointer_table",
			"order_by_sieve_table",
			"trillion_table",
			"trapezoid_table",
			"tapered_baguette_table",
			"baguette_table",
        ];
        
        // Hide all tables
        all_tables.forEach(table => {
            frm.set_df_property(table, "hidden", 1);
        });

        // Hide all pricing tables
        update_pricing_tables_visibility(frm);
    },
    
    // Button handlers for each shape
    round: function(frm) {
        // First hide all tables
        frm.events.hide_all_tables(frm);
        // Then show only the round tables
        frm.set_df_property("order_by_mm_table", "hidden", 0);
        frm.set_df_property("order_by_pointer_table", "hidden", 0);
        frm.set_df_property("order_by_sieve_table", "hidden", 0);
    },
    
    oval: function(frm) {
        frm.events.hide_all_tables(frm);
        frm.set_df_property("oval_table", "hidden", 0);
    },
    
    emerald: function(frm) {
        frm.events.hide_all_tables(frm);
        frm.set_df_property("emerald_table", "hidden", 0);
    },
    
    pear: function(frm) {
        frm.events.hide_all_tables(frm);
        frm.set_df_property("pear_table", "hidden", 0);
    },
    
    marquise: function(frm) {
        frm.events.hide_all_tables(frm);
        frm.set_df_property("marquise_table", "hidden", 0);
    },
    
    princess: function(frm) {
        frm.events.hide_all_tables(frm);
        frm.set_df_property("princess_table", "hidden", 0);
    },
    
    radiant: function(frm) {
        frm.events.hide_all_tables(frm);
        frm.set_df_property("radiant_table", "hidden", 0);
    },
    any_other: function(frm) {
        frm.events.hide_all_tables(frm);
        frm.set_df_property("any_other_table", "hidden", 0);
        frm.set_df_property("shape", "hidden", 0);
    },
	trillion: function(frm) {
        frm.events.hide_all_tables(frm);
        frm.set_df_property("trillion_table", "hidden", 0);
    },
	trapezoid: function(frm) {
        frm.events.hide_all_tables(frm);
        frm.set_df_property("trapezoid_table", "hidden", 0);
    },
	tapered_baguette: function(frm) {
        frm.events.hide_all_tables(frm);
        frm.set_df_property("tapered_baguette_table", "hidden", 0);
    },
	baguette: function(frm) {
        frm.events.hide_all_tables(frm);
        frm.set_df_property("baguette_table", "hidden", 0);
    },
    refresh: function(frm) {
        // Hide all tables on initial load
        frm.events.hide_all_tables(frm);
        frm.set_df_property("shape", "hidden", 1);
    }
});

// Function to update pricing tables visibility
function update_pricing_tables_visibility(frm) {
    const pricing_tables = [
        "emerald_pricing_table",
        "oval_pricing_table",
        "pear_pricing_table",
        "marquise_pricing_table",
        "princess_pricing_table",
        "radiant_pricing_table",
        "any_other_pricing_table",
        "trillion_pricing_table",
        "order_by_mm_pricing_table",
        "order_by_pointer_pricing_table",
        "order_by_sieve_pricing_table",
        "trillion_pricing_table",
        "trapezoid_pricing_table",
        "tapered_baguette_pricing_table",
        "baguette_pricing_table",
    ];

    // Check each pricing table
    pricing_tables.forEach(table => {
        const tableData = frm.doc[table] || [];
        // Hide table if empty, show if has data
        frm.set_df_property(table, "hidden", tableData.length === 0);
    });
}

// Function to calculate amount
function calculate_amount(frm, cdt, cdn) {
    let row = locals[cdt][cdn];
    if (row.pricect && row.quantity_cts) {
        let amount = flt(row.pricect) * flt(row.quantity_cts);
        frappe.model.set_value(cdt, cdn, 'amt', amount);
    }
    // Update pricing tables visibility after calculation
    update_pricing_tables_visibility(frm);
}

// ovel pricing table 


// Oval Table Handler
frappe.ui.form.on('Oval', {
	size: function(frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		let size = row.size;
		let fancy = "OVAL";
		frm.call({
			method: "emergediam.emergediam.doctype.order.order.get_table_data",
			args: {
				size: size,
				fancy: fancy,
			},
			callback: function(r) {
				if (r.message && Array.isArray(r.message) && r.message.length > 0) {
					let data = r.message[0];
					frappe.model.set_value(cdt, cdn, 'mm', data.mm || '');
					frappe.model.set_value(cdt, cdn, 'avg_pts', data.avg_pts || '');
					frappe.model.set_value(cdt, cdn, 'quality', data.quality || '');
					frm.refresh_field('oval_table');
				}
			}
		});
	},
    
});

// Emerald Table Handler
frappe.ui.form.on('Emerald', {
	size: function(frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		let size = row.size;
		let fancy = "EMERALD";
		frm.call({
			method: "emergediam.emergediam.doctype.order.order.get_table_data",
			args: {
				size: size,
				fancy: fancy,
			},
			callback: function(r) {
				if (r.message && Array.isArray(r.message) && r.message.length > 0) {
					let data = r.message[0];
					frappe.model.set_value(cdt, cdn, 'mm', data.mm || '');
					frappe.model.set_value(cdt, cdn, 'avg_pts', data.avg_pts || '');
					frappe.model.set_value(cdt, cdn, 'quality', data.quality || '');
					frm.refresh_field('emerald_table');
				}
			}
		});
	},
    
});

// Pear Table Handler
frappe.ui.form.on('Pear', {
	size: function(frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		let size = row.size;
		let fancy = "PEAR";
		frm.call({
			method: "emergediam.emergediam.doctype.order.order.get_table_data",
			args: {
				size: size,
				fancy: fancy,
			},
			callback: function(r) {
				if (r.message && Array.isArray(r.message) && r.message.length > 0) {
					let data = r.message[0];
					frappe.model.set_value(cdt, cdn, 'mm', data.mm || '');
					frappe.model.set_value(cdt, cdn, 'avg_pts', data.avg_pts || '');
					frappe.model.set_value(cdt, cdn, 'quality', data.quality || '');
					frm.refresh_field('pear_table');
				}
			}
		});
	},
    
});

// Marquise Table Handler
frappe.ui.form.on('Marquise', {
	size: function(frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		let size = row.size;
		let fancy = "MARQUISE";
		frm.call({
			method: "emergediam.emergediam.doctype.order.order.get_table_data",
			args: {
				size: size,
				fancy: fancy,
			},
			callback: function(r) {
				if (r.message && Array.isArray(r.message) && r.message.length > 0) {
					let data = r.message[0];
					frappe.model.set_value(cdt, cdn, 'mm', data.mm || '');
					frappe.model.set_value(cdt, cdn, 'avg_pts', data.avg_pts || '');
					frappe.model.set_value(cdt, cdn, 'quality', data.quality || '');
					frm.refresh_field('marquise_table');
				}
			}
		});
	},
    
});

// Princess Table Handler
frappe.ui.form.on('Princess', {
	size: function(frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		let size = row.size;
		let fancy = "PRINCESS";
		frm.call({
			method: "emergediam.emergediam.doctype.order.order.get_table_data",
			args: {
				size: size,
				fancy: fancy,
			},
			callback: function(r) {
				if (r.message && Array.isArray(r.message) && r.message.length > 0) {
					let data = r.message[0];
					frappe.model.set_value(cdt, cdn, 'mm', data.mm || '');
					frappe.model.set_value(cdt, cdn, 'avg_pts', data.avg_pts || '');
					frappe.model.set_value(cdt, cdn, 'quality', data.quality || '');
					frm.refresh_field('princess_table');
				}
			}
		});
	},
    
});

// Radiant Table Handler
frappe.ui.form.on('Radiant', {
	size: function(frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		let size = row.size;
		let fancy = "RADIANT";
		frm.call({
			method: "emergediam.emergediam.doctype.order.order.get_table_data",
			args: {
				size: size,
				fancy: fancy,
			},
			callback: function(r) {
				if (r.message && Array.isArray(r.message) && r.message.length > 0) {
					let data = r.message[0];
					frappe.model.set_value(cdt, cdn, 'mm', data.mm || '');
					frappe.model.set_value(cdt, cdn, 'avg_pts', data.avg_pts || '');
					frappe.model.set_value(cdt, cdn, 'quality', data.quality || '');
					frm.refresh_field('radiant_table');
				}
			}
		});
	},
    
});

// Trillion Table Handler
frappe.ui.form.on('Trillion', {
	size: function(frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		let size = row.size;
		let fancy = "TRILLION";
		frm.call({
			method: "emergediam.emergediam.doctype.order.order.get_table_data",
			args: {
				size: size,
				fancy: fancy,
			},
			callback: function(r) {
				if (r.message && Array.isArray(r.message) && r.message.length > 0) {
					let data = r.message[0];
					frappe.model.set_value(cdt, cdn, 'mm', data.mm || '');
					frappe.model.set_value(cdt, cdn, 'avg_pts', data.avg_pts || '');
					frappe.model.set_value(cdt, cdn, 'quality', data.quality || '');
					frm.refresh_field('trillion_table');
				}
			}
		});
	},
    
});

// Trapezoid Table Handler
frappe.ui.form.on('Trapezoid', {
	size: function(frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		let size = row.size;
		let fancy = "TRAPEZOID";
		frm.call({
			method: "emergediam.emergediam.doctype.order.order.get_table_data",
			args: {
				size: size,
				fancy: fancy,
			},
			callback: function(r) {
				if (r.message && Array.isArray(r.message) && r.message.length > 0) {
					let data = r.message[0];
					frappe.model.set_value(cdt, cdn, 'mm', data.mm || '');
					frappe.model.set_value(cdt, cdn, 'avg_pts', data.avg_pts || '');
					frappe.model.set_value(cdt, cdn, 'quality', data.quality || '');
					frm.refresh_field('trapezoid_table');
				}
			}
		});
	},
    
});

// Tapered Baguette Table Handler
frappe.ui.form.on('Tapered Baguette', {
	size: function(frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		let size = row.size;
		let fancy = "TAPERED BAGUETTE";
		frm.call({
			method: "emergediam.emergediam.doctype.order.order.get_table_data",
			args: {
				size: size,
				fancy: fancy,
			},
			callback: function(r) {
				if (r.message && Array.isArray(r.message) && r.message.length > 0) {
					let data = r.message[0];
					frappe.model.set_value(cdt, cdn, 'mm', data.mm || '');
					frappe.model.set_value(cdt, cdn, 'avg_pts', data.avg_pts || '');
					frappe.model.set_value(cdt, cdn, 'quality', data.quality || '');
					frm.refresh_field('tapered_baguette_table');
				}
			}
		});
	},
    
});

// Baguette Table Handler
frappe.ui.form.on('Baguette', {
	size: function(frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		let size = row.size;
		let fancy = "BAGUETTE";
		frm.call({
			method: "emergediam.emergediam.doctype.order.order.get_table_data",
			args: {
				size: size,
				fancy: fancy,
			},
			callback: function(r) {
				if (r.message && Array.isArray(r.message) && r.message.length > 0) {
					let data = r.message[0];
					frappe.model.set_value(cdt, cdn, 'mm', data.mm || '');
					frappe.model.set_value(cdt, cdn, 'avg_pts', data.avg_pts || '');
					frappe.model.set_value(cdt, cdn, 'quality', data.quality || '');
					frm.refresh_field('baguette_table');
				}
			}
		});
	},
    
});

// Order By MM Table Handler
frappe.ui.form.on('Order By MM', {
    
});

// Order By Pointer Table Handler
frappe.ui.form.on('Order By Pointer', {
    
});

// Order By Sieve Table Handler
frappe.ui.form.on('Order By Sieve', {
    
});


frappe.ui.form.on('Pricing', {
    pricect: function(frm, cdt, cdn) {
        calculate_amount(frm, cdt, cdn);
    },
    quantity_cts: function(frm, cdt, cdn) {
        calculate_amount(frm, cdt, cdn);
    },
    // Add handler for row deletion
    pricing_remove: function(frm, cdt, cdn) {
        update_pricing_tables_visibility(frm);
    }
});
