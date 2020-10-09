# messageEncryptor

It is just my sandbox to practice JS. 

It has no practical use, the methods of encryption are classical ciphers that are no longer in use by the modern cryptography. 

But it still can be used for having fun, while chating with your friends!

Two encryption methods are used:

- first one is a permutation using a "magic square";

- the second one is the "Caesar's" cipher, substitution but with letter shift to the Latin alphabet.


I put five static "magic squares" to the code and use one of them randomly, according to the key. A much better way is to generate a new "magic square" at every iteration.
I have a plan to do it as a next step.

The step of substitution and the key to "magic square" is counted from the length of the entered message. 
After, they are concatenated to the end of the encrypted message and will be used in the message decryption. 
A much safer way is to send it separately, but this script has no purpose to be the safest one.

After the message is encrypted, it goes to the 
clipboard, and is ready to be sent.

