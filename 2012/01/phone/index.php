<? $number = $_SERVER['x-up-calling-line-id']; ?>

<style>body { font-family: Helvetica, Arial, sans-serif; }</style>

<? if ($number): ?>
<?= htmlspecialchars($number); ?><br><a id="skype" href="skype:+<?= htmlspecialchars($number); ?>?call">Call With Skype</a>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script>$("#skype").click();</script>
<? else: ?>
No phone number detected.
<? endif; ?>

