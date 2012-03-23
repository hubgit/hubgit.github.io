// http://stackoverflow.com/a/5158301/145899
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function enquote(text) {
	return '"' + text + '"';
}

var params = {
	"q": "*:*",
	"fl": "id,title,publication_date",
	"fq": "cross_published_journal_key:PLoSONE AND doc_type:full",
	"rows": 100,
	"facet.field": "subject_facet",
	"facet.mincount": 1,
	"sort": "publication_date desc",
	"wt": "json",
	"hl": "false",
};

var subjectRequest = getParameterByName("subject");
if (subjectRequest) {
	params["q"] = params["facet.query"] = "subject_facet:" + subjectRequest;
}

$.getJSON("http://api.plos.org/search/?json.wrf=?", params, function(data) {
	$("#total").text(data.response.numFound + " articles");
	
	var article, dateString, date;
			
	$.each(data.response.docs, function(key, item) {
		article = $("<a/>", { text: item.title, href: "http://plos.macropus.org/articles/?theme=html&doi=" + encodeURIComponent(item.id) });
		
		dateString = (new Date(item.publication_date)).format('d mmmm yyyy');
		date = $("<div/>", { class: "date", text: dateString });
		
		$("<li/>", { class: "article" }).append(article).append(date).appendTo("#articles");
	});
});
