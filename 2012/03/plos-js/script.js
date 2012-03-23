function enquote(text) {
	return '"' + text + '"';
}

var params = {
	"q": "*:*",
	"fl": "id",
	"fq": "cross_published_journal_key:PLoSONE AND doc_type:full",
	"rows": 0,
	"facet.field": "subject_facet",
	"facet.mincount": 1,
	"sort": "publication_date desc",
	"wt": "json",
	"hl": "false",
};

$.getJSON("http://api.plos.org/search/?json.wrf=?", params, function(data) {	
	var subject;

	$.each(data.facet_counts.facet_fields.subject_facet, function(key, value) {
		if (key % 2) {
			$("<span/>", { class: "count", text: value }).appendTo(subject);
			$("<li/>", { class: "subject" }).append(subject).appendTo("#subjects");
		}
		else {
			subject = $("<a/>", { text: value, target: "articles", href: "articles?subject=" + encodeURIComponent(enquote(value)) });
		}
	});
});
