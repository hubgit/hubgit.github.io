<? $number = $_SERVER['HTTP_X_UP_CALLING_LINE_ID']; ?>

<meta name = "viewport" content = "width = device-width">
<meta name = "viewport" content = "initial-scale = 1.0">
<style>body { font-family: Helvetica, Arial, sans-serif; }</style>

<? if ($number): ?>

+<?= htmlspecialchars($number); ?>
<button id="skype" data-tel="<?= htmlspecialchars($number); ?>">Call With Skype</button>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script>
$("#skype").click(function(){
 location.href = "skype:+" + $(this).data("tel") + "?call";
}).click();
</script>

<? else: ?>
No phone number detected.
<? endif; ?>
