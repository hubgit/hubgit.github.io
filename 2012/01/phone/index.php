<? $number = $_SERVER['x-up-calling-line-id']; ?>

<style>body { font-family: Helvetica, Arial, sans-serif; }</style>

<? if ($number): ?>
<?= htmlspecialchars($number); ?><br><a href="skype:+<?= htmlspecialchars($number); ?>?call">Call With Skype</a>
<? else: ?>
No phone number detected.
<? endif; ?>
