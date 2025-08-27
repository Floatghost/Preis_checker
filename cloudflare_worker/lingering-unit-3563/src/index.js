import Fuse from "fuse.js";

export default {
	async fetch(request, env) {
		const corsHeaders = {
		"Access-Control-Allow-Origin": "*", // or restrict to your domain
		"Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
		"Access-Control-Max-Age": "86400",
		};

		if (request.method === "OPTIONS") {
		return new Response(null, {
			status: 204,
			headers: corsHeaders,
		});
		}

		try {
		const url = new URL(request.url);
		const pathname = url.pathname;

		if (pathname === "/api/price") {
			const q = url.searchParams.get("q") || "";

			const { results } = await env.DB.prepare(
			"SELECT * FROM products WHERE product_id > ?"
			)
			.bind("2")
			.all();

			const fuse = new Fuse(results, {
			keys: ["name"],
			threshold: 0.4,
			});

			const fuzzyResults = fuse.search(q);
			const matchedProducts = fuzzyResults.map(result => result.item);

			return new Response(JSON.stringify(matchedProducts), {
			headers: {
				"Content-Type": "application/json",
				...corsHeaders,
			},
			});
		}

		if (pathname === "/api/stats") {
			const scraped_websites = Math.floor(Math.random() * 1000);
			const scraped_products = Math.floor(Math.random() * 1000);

			return new Response(JSON.stringify({
				"websites_scraped": scraped_websites,
				"products_scraped": scraped_products
			}), {
			headers: {
				"Content-Type": "application/json",
				...corsHeaders,
			},
			});
		}

		if (pathname === "/api/insert") {
			const { meta } = await env.DB.prepare(
			"INSERT INTO products (name, manufacturer, description, category_id) VALUES (?, ?, ?, ?)"
			)
			.bind("test", "tester", "fdahsfklajs", 1203)
			.run();

			return new Response(JSON.stringify({
			success: true,
			inserted_id: meta.last_row_id,
			changes: meta.changes,
			}), {
			headers: {
				"Content-Type": "application/json",
				...corsHeaders,
			},
			});
		}

		return new Response("Endpoint not found", {
			status: 404,
			headers: corsHeaders,
		});
		} catch (err) {
		return new Response(JSON.stringify({
			error: err.message || "Internal error",
		}), {
			status: 500,
			headers: {
			"Content-Type": "application/json",
			...corsHeaders,
			},
		});
		}
	}
};
