export class Reflow {
    constructor(label, alertAfter, alertAudioVolume) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.getNewId()
        });
        Object.defineProperty(this, "label", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "startedOn", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "cycleStartedOn", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "cycle", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "cycleElapsed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "totalElapsed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "averageElapsed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "alertAfter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "alertAudioVolume", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1.0
        });
        Object.defineProperty(this, "alertAudio", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Audio('data:audio/mpeg;base64,//uQBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAoAABC7wAGBgwMDBMTGRkZICAmJiYsLDMzMzk5QEBGRkZMTExTU1lZYGBgZmZmbGxzc3l5eYCAhoaGjIyTk5OZmZmgoKamrKyss7O5ubnAwMbGxszMzNPT2dng4ODm5uzs7PPz+fn5//8AAAA6TEFNRTMuOTlyAaoAAAAAAAAAABSAJAV8RgAAgAAAQu8JBhdVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQBAAAAasF0VU8IAw1YLoqp4QBjyzBZ7m3kFHlmCz3NvIKAAFtORtJMTQljiX8W8NWIeQtC3CgYgg5YPvygIcHz+oEHFOoP9H+j/R7+BPP/9b5R3/+v8PgAC2nI2kmJoSxxL+LeGrEPIWhbhQMQQcsH35QEOD5/UCDinUH+j/R/o9/Ann/+t8o7//X+HwACHRcrrPN7fp6NAGADNTNW8SCR46BlYboGK+W40x+AIBJ7tozUtsQAsEWRAweQNAtg6WQYzo+k2qmEK4hENlxaE+a8LDqDWInVykZGZhf3vBjwIM2n2oNcYxqe1NxXzZZD3u9VzjHvrV62xumIYw74IjXPrSIjf/1gAEOi5XWeb2/T0aAMAGamat4kEjx0DKw3QMV8txpj8AQCT3bRmpbYgBYIsiBg8gaBbB0sgxnR9JtVMIVxCIbLi0J814WHUGsROrlIyMzC/veDHgQZtPtQa4xjU9qbivmyyHvd6rnGPfWr1tjdMQxh3wRGufWkRG//rUAIEpOPWSJJuEYPh7Fo6HO66qM7tK3UcIeaJ2IMlsy//uSBA+IgxYs129lAAxixZrt7KABiuBlZ6wwxXFcDKz1hhiuxZQvj6EnNWaQfowkqg0HyySWoRotzEvwO+I62+KmGVM2auooifXxhiDtIplCFA5rUo9l7GoYEK3proMEcj1qXZ6XO6wAgSk49ZIkm4Rg+HsWjoc7rqozu0rdRwh5onYgyWzLFlC+PoSc1ZpB+jCSqDQfLJJahGi3MS/A74jrb4qYZUzZq6iiJ9fGGIO0imUIUDmtSj2XsahgQremugwRyPWpdnpc7rbl021sbkpJHBx2lgY0vAodjTQgYKYhqjQzDTDTFdDS2FInlX+buIBwilHNjpFOmsRomiqSpo6UQuDg+HnkzaErU8Y0OUCBY5FDrAo5/X+yhXsp0/vustbl021sbkpJHBx2lgY0vAodjTQgYKYhqjQzDTDTFdDS2FInlX+buIBwilHNjpFOmsRomiqSpo6UQuDg+HnkzaErU8Y0OUCBY5FDrAo5/X+yhXsp0/vustVAMuuXXfbSSyARmJ35k2KJkcw0jblQc3eldI/QR0j5yhvE4Jdlgo4A2P/7kgQUgALUJ9rrCRs8WoT7XWEjZ40M70uuMGshoZ3pdcYNZJ0K4nvd8FilW+uXoeIJqQv3ccWDoBFQCgqTWVP4Ap22o4EH+q3rpOdCXpTZe8eX5760Ay65dd9tJLIBGYnfmTYomRzDSNuVBzd6V0j9BHSPnKG8Tgl2WCjgDYnQrie93wWKVb65eh4gmpC/dxxYOgEVAKCpNZU/gCnbajgQf6reuk50JelNl7x5fnvrAAAADsuskajMDGqFOkiowOSDLaRSGT0qBgnZcVQG8oP3bDMpGcJlLcp49fx5ro9dFrdU6QVlEqJIOiw92iktLlpZdPudznkSFn5dlIsyf2zK9vhiW1mqzPxVOfIrT9qoj1UxU5Di101gAAAB2XWSNRmBjVCnSRUYHJBltIpDJ6VAwTsuKoDeUH7thmUjOEyluU8ev4810eui1uqdIKyiVEkHRYe7RSWly0sun3O5zyJCz8uykWZP7Zle3wxLazVZn4qnPkVp+1UR6qYqchxa6a0AMFp327WxuZDl03mFgPUXT1cMQXSC+DqCyUbm3Hs9GYT/+5IEEIADIDTY6wwZ7GQGmx1hgz2LqIVjrLDM8XUQrHWWGZ5shWnLZPFzRxKUOc4Ob9HEOYqoEoXg82GCc5cpmU31MGD7OESEPMvj5wEKPLBMNCwsbpTSEIXRD1QpFkSXZTqyifopADBad9u1sbmQ5dN5hYD1F09XDEF0gvg6gslG5tx7PRmEbIVpy2Txc0cSlDnODm/RxDmKqBKF4PNhgnOXKZlN9TBg+zhEhDzL4+cBCjywTDQsLG6U0hCF0Q9UKRZEl2U6son6KQAio5NttI25NChYeQuUHeQKvKwk9ffSTwyx6yLkMwqLrruQsw3RR6hC6gPIWhXXfLh2mbKpW+e6mrVxKdpto++xiovqRcgKVoizVr7m+PizU4UGE9tTfW7XS1drhQAIqOTbbSNuTQoWHkLlB3kCrysJPX30k8Msesi5DMKi667kLMN0UeoQuoDyFoV13y4dpmyqVvnupq1cSnabaPvsYqL6kXIClaIs1a+5vj4s1OFBhPbU31u10tXa4UUgEGOXXbWtuXUtBeFQwRD1Hp40vT0asMfgtqot//uSBA4AAuguWOssG1xdBcsdZYNrjLBvS65hhKGWDel1zDCUbBhVLyuLDffstbpOfVFdTMOyxfCBg7VtVbxIQoSdIswwz9xtTInk2yHExpdjAgTXGJu31MRrSpfUMR7yyqNrbO0gEGOXXbWtuXUtBeFQwRD1Hp40vT0asMfgtqotbBhVLyuLDffstbpOfVFdTMOyxfCBg7VtVbxIQoSdIswwz9xtTInk2yHExpdjAgTXGJu31MRrSpfUMR7yyqNrbO0AAAku7ayNuF9QAtjUxDBQDOLiAiDYqCDzsBiLXmORjcvjBonyZ4xKXMtk2ry7Sf13WKNXe6vzm/Hr6217w9MAYUY0os2WyJlQpXJobQ9BYyaY9zhfa/N2Vy7aJ4brTFVrZEFfvrAAAJLu2sjbhfUALY1MQwUAzi4gIg2Kgg87AYi15jkY3L4waJ8meMSlzLZNq8u0n9d1ijV3ur85vx6+tte8PTAGFGNKLNlsiZUKVyaG0PQWMmmPc4X2vzdlcu2ieG60xVa2RBX76wAyW5drvI23Slhgdto5wBOoBYcWNP/7kgQKgAKTINjrDDI8UmQbHWGGR4sgw23sMGfxZBhtvYYM/vEN0uEZDG0IyqPGP4RWVuQ55UaNucXtu/9xey612dUDzcc47Apm2xVqLL2c/sXxxL9aa5JF60cWYGWEv/2gBkty7XeRtulLDA7bRzgCdQCw4saeIbpcIyGNoRlUeMfwisrchzyo0bc4vbd/7i9l1rs6oHm45x2BTNtirUWXs5/YvjiX601ySL1o4swMsJf/tIAMSRFWN/9pJbyXxQ+CkwcGTXRTxVjFCCyNkNjCTi2YPzXaV/dxHuoAhkaZG5YMAAwEyYAcXYY+Fl0v0h9orsaI98rjaugx9EbbXFC/93Sxu2rUrT+/6/YogAxJEVY3/2klvJfFD4KTBwZNdFPFWMUILI2Q2MJOLZg/NdpX93Ee6gCGRpkblgwADATJgBxdhj4WXS/SH2iuxoj3yuNq6DH0RttcUL/3dLG7atStP7/r9ikAMuS77f7SS+z9IKeJj3162hQxQMxVeOJLbBOtSCruJGzKklcmyIYyKCyTtWsZJsUIoch4Yzg0CqCAqbH/+5IEHgACoCdbawsZ3FQE621hYzuKoMlRrSRrIVQZKjWkjWSJLEhnOWYqqn3U2vStdS2n6aKuhEh/RSsAMuS77f7SS+z9IKeJj3162hQxQMxVeOJLbBOtSCruJGzKklcmyIYyKCyTtWsZJsUIoch4Yzg0CqCAqbGJLEhnOWYqqn3U2vStdS2n6aKuhEh/RSsAAAtz7/62OLmBGcxSIUVmkoMBUuqlo4aYVLAedQRiTxDmL4v6gcm5+Zihb7iFBoW/sbve9ztImz1vC69n08ss4fl9XWBijpfoAt27I7rbGWSdP8noAAALc+/+tji5gRnMUiFFZpKDAVLqpaOGmFSwHnUEYk8Q5i+L+oHJufmYoW+4hQaFv7G73vc7SJs9bwuvZ9PLLOH5fV1gYo6X6ALduyO62xlknT/J6BADE0VFjXa2OCLDgyLDsBlZxkt4PXSeRRqNGnS+I3H/97MyeyvjPsQUMkill5QYGguIkhwqCI0BKIKMYspImC1b311vccNtDaK+h691hKpgpUhOaGiAGJoqLGu1scEWHBkWHYDKzjJb//uSBDQAAqUYWfsMGexUows/YYM9imyfVa08ZXFNk+q1p4yuweuk8ijUaNOl8RuP/72Zk9lfGfYgoZJFLLygwNBcRJDhUERoCUQUYxZSRMFq3vrre44baG0V9D17rCVTBSpCc0NABASUjcjRIL/iAcA7JIGPOXXsKNeArNJs5PZAyOa5WOrPZ1AiQhdFwgQe7R4vnvQTClBFWiadfogpI59WthqgQUYBViKl1yq1safi10pe87///1gAgJKRuRokF/xAOAdkkDHnLr2FGvAVmk2cnsgZHNcrHVns6gRIQui4QIPdo8Xz3oJhSgirRNOv0QUkc+rWw1QIKMAqxFS65Va2NPxa6Uved///6wAAW3LJK2knNkGgUUsDMuJWeEondFa0yFLCNuqBkXPg5bN0AYt0dEaYdqdWID2ZmhkQAEomBNx5aWK1wExzrHMkx8BaBv7IVVt7lF279N6cvyOztAABbcskraSc2QaBRSwMy4lZ4Sid0VrTIUsI26oGRc+Dls3QBi3R0Rph2p1YgPZmaGRAASiYE3HlpYrXATHOscyTH//7kgRLAAKeHdbrDxFsU8O63WHiLYpQbWOsPMcxSg2sdYeY5gFoG/shVW3uUXbv03py/I7O0AEKObW6yNoZkoBacwP5kDb6OTJmTrsrJEt3CxxbgLJhkpWH8Ochqz6J+HzOdgYyiKAXQceOQIQOEo4Pn6ooTaJkjaLUVANE+loy84ZJK2QB/+oAEKObW6yNoZkoBacwP5kDb6OTJmTrsrJEt3CxxbgLJhkpWH8Ochqz6J+HzOdgYyiKAXQceOQIQOEo4Pn6ooTaJkjaLUVANE+loy84ZJK2QB/+pWAk3JvdtbG5IUgihbpIP2m00xemeKQDbkglfiLZNx2MqQI7Y5s7LxQ+FnCkwr3+ZQvYj9I95Ix3mXoPJEV2koguPEJin9Wc7Pf3K//9LASbk3u2tjckKQRQt0kH7TaaYvTPFIBtyQSvxFsm47GVIEdsc2dl4ofCzhSYV7/MoXsR+ke8kY7zL0HkiK7SUQXHiExT+rOdnv7lf/+kAAAu//bbSUP8KtTljgKXPS0UvYfGy0MCszogfxIJp0oAOTFDebamfwZS3hb/+5IEY4ACayxaawkazE1li01hI1mKfEdRrSTKoU+I6jWkmVSHQkKoQ6F4sgUaGwk05NA4HxKIkjxi46YHkrM8FP9qlxJG0stXbJC4AABd/+22kof4VanLHAUuelopew+NloYFZnRA/iQTTpQAcmKG821M/gylvC0OhIVQh0LxZAo0NhJpyaBwPiURJHjFx0wPJWZ4Kf7VLiSNpZau2SF1EQITVVaNtbZHKYgKmA4I0yy9GDcut1tsZh++DSbNjXf1HKyTs6Id1V/cR2O75Z04RH//f8+lZKPYNvNWJsahizY5yegnhEwHEN7mHOyvb/y3/6hECE1VWjbW2RymICpgOCNMsvRg3LrdbbGYfvg0mzY139Rysk7OiHdVf3Edju+WdOER//3/PpWSj2DbzVibGoYs2OcnoJ4RMBxDe5hzsr2/8t/+oAAByX7f3SOQEMCYmABQoFFFmCT+IyI1AkIwKjMpoKHNQ95bP4zdxy3gnUzSinlnNAWKsgOftfDCTD1XBNExGBEd3IWATQT9gkjSrb/Y/1Gv3f+3+oAAByX7f3SO//uSBIEAApYl2nsJG0xSxLtPYSNpipiDT62wSWFTEGn1tgksQEMCYmABQoFFFmCT+IyI1AkIwKjMpoKHNQ95bP4zdxy3gnUzSinlnNAWKsgOftfDCTD1XBNExGBEd3IWATQT9gkjSrb/Y/1Gv3f+3+oAAB6b/f72wUIUKBqFfZ+Qyz1OrRdSlB5zRkXx+dWeUZxgug421CQ/djY5z7TmT25nr+Z9Tx4wMl3BU+ODpmUDxh1MZvCEUYL3CpsalTiXmKgAAHpv9/vbBQhQoGoV9n5DLPU6tF1KUHnNGRfH51Z5RnGC6DjbUJD92NjnPtOZPbmev5n1PHjAyXcFT44OmZQPGHUxm8IRRgvcKmxqVOJeYqAgMjWFd9ttY3Mj2FlBQgfIo+Zibvk+4mYax2nUSkdJYA5aYRwLAL6yTlkd0VVmGvtqx+7ICV1a4zhGHPVTgg4sgphyVU9tq29hs73f2Yz6Pupu6/9IEBkawrvttrG5kewsoKED5FHzMTd8n3EzDWO06iUjpLAHLTCOBYBfWScsjuiqsw19tWP3ZASurXGcI//7kgSYgAKGI9TrTBo4UMR6nWmDRwqkoWnnmE7xVJQtPPMJ3g56qcEHFkFMOSqnttW3sNne7+zGfR91N3X/pQAAAAgTax2QohIkCpxy42OHhzTagoECzNh2upK23oo6GPOFD8CfHMhwjaSjMmWIVKmC9bbpxBtCBAMB5EPjFZxCRlve/pWLLrahWpX+3uAAAACBNrHZCiEiQKnHLjY4eHNNqCgQLM2Ha6krbeijoY84UPwJ8cyHCNpKMyZYhUqYL1tunEG0IEAwHkQ+MVnEJGW97+lYsutqFalf7e5AAJ12yyNpJqcA0crjZcJ5vc6ul5WochTGL0dilA56hNcDTBVFhrzGe4iYWh9crSKErUTJh3Gb5rWtdxQXUirdFnHlq/9RKlD5IV25NHQUX/MdSAATrtlkbSTU4Bo5XGy4Tze51dLytQ5CmMXo7FKBz1Ca4GmCqLDXmM9xEwtD65WkUJWomTDuM3zWta7igupFW6LOPLV/6iVKHyQrtyaOgov+Y6kAABV2yOJJFSAlVBTRCWDII606unfSQZp6pBH1qQTD157/+5IEsYACdBRSe3gxSE6Cik9vBikKTFtbrJzOMUmLa3WTmcZMcYLLIvZXcHG2bt0OaEY7N7J0uVnUTFPu2nllhmm+yMEZ+tx9NkJn1EY7in4r30e2z9/3AAAKu2RxJIqQEqoKaISwZBHWnV076SDNPVII+tSCYevPJjjBZZF7K7g42zduhzQjHZvZOlys6iYp9208ssM032RgjP1uPpshM+ojHcU/Fe+j22fv+4AIOS7TWyNoUifqXD6B8ZARLw/MoJAoopF9Z6xCOd9CM6YkkRxCf/uyC3sjtdff+r71G4+Oj2C6AUsBgoUeoYoXRKTiCgbWTaSGqV2SYuzlv/1ABByXaa2RtCkT9S4fQPjICJeH5lBIFFFIvrPWIRzvoRnTEkiOIT/92QW9kdrr7/1feo3Hx0ewXQClgMFCj1DFC6JScQUDaybSQ1SuyTF2ct/+pQAAADNHn/faR2BGUkdQZLH1XqxJ95F+40xncfe3GQVJbYC8pdRdp3ebUQeZhae6r/rnCJetCNzKQcrfvSxzQOio88BS4qoifHvIngiMUx55//uSBM+AAqkhVesmFCxVJCq9ZMKFikR9Yaw8xXFIj6w1h5iupNFju4Wl0P7W7+jMEv+ilTQAAADNHn/faR2BGUkdQZLH1XqxJ95F+40xncfe3GQVJbYC8pdRdp3ebUQeZhae6r/rnCJetCNzKQcrfvSxzQOio88BS4qoifHvIngiMUx55pNFju4Wl0P7W7+jMEv+ilTSAi5bvttI246BQA6SzAHz8WCGZMVZWyzVPIqZXEHvQWZWL7IEFXjSuvEA2Ffds1XJN4q8h/ht7E+E7CG+MEiHoLjzbUY9A1rbFN5uhNv7qvfU1DOsX+wUICLlu+20jbjoFADpLMAfPxYIZkxVlbLNU8iplcQe9BZlYvsgQVeNK68QDYV92zVck3iryH+G3sT4TsIb4wSIeguPNtRj0DWtsU3m6E2/uq99TUM6xf7BRSg077/dtbJLtO5It1SZF5QekYFabJ1RPcwoxNPUwX3c0gc2oo5Vqt0GBtFo3E3dlGmZcqqOV+8mrlbrp3GWKCyiM/M6Jpzs82lJferTYgy1Fca1lnfSoyUGnff7tv/7kgTnAAMGJlP7RhvIYMTKf2jDeQrwh2OnsMzxXhDsdPYZnrZJdp3JFuqTIvKD0jArTZOqJ7mFGJp6mC+7mkDm1FHKtVugwNotG4m7so0zLlVRyv3k1crddO4yxQWURn5nRNOdnm0pL71abEGWorjWss76VGQAAATmHf7fWNxVUKnjzgxGsM/RZUpRmQDZxRH0QFLLgLmJU/SAK5dSQvJArwjAfISHKnJn0/SpCPg0C2+ML0vkf0hSxe8AGYsxQuQMzzzYqF8d8V66h9xm/Rv1oYmjZzNQAAAJzDv9vrG4qqFTx5wYjWGfosqUozIBs4oj6ICllwFzEqfpAFcupIXkgV4RgPkJDlTkz6fpUhHwaBbfGF6XyP6QpYveADMWYoXIGZ55sVC+O+K9dQ+4zfo360MTRs5mpQAAAEpYfffVtR3AuLhGUYCHnOkiTaetoKBFCQOq+Q8+CSjyNiiE+5EmMOm3ke2zGzP30dW/pCNQJAYDToAgMAsBFguGTYjSIogIpe616uPGdjL1Qj+rbwgtVy8YxKKb3MfrAAAASlh999X/+5IE7YACuy5aawgTrFdly01hAnWMHKFN7TxpIYOUKb2njSS1HcC4uEZRgIec6SJNp62goEUJA6r5Dz4JKPI2KIT7kSYw6beR7bMbM/fR1b+kI1AkBgNOgCAwCwEWC4ZNiNIiiAil7rXq48Z2MvVCP6tvCC1XLxjEopvcx+tbW3a2NqRwkkmXFBZGc8fIUl7pSAgeNP7J4g+dBuYeSXLfvyzT9KvLv0hColgy8U3nHhGwIJwEeAxgqIwwIAqDrg4EyaVVvadaxAo5NbI9CBLcpzjVdVF6VszGnijB7Pe5yhZbW3a2NqRwkkmXFBZGc8fIUl7pSAgeNP7J4g+dBuYeSXLfvyzT9KvLv0hColgy8U3nHhGwIJwEeAxgqIwwIAqDrg4EyaVVvadaxAo5NbI9CBLcpzjVdVF6VszGnijB7Pe5yhYAABXbXWuNNs2EDUDrBAsOxXVIhjgRBYytieCw2sbxtrxAhVWIe1L3Uscki0VfTaab7ZgKvDKQK0wwja6pMVKKHoWgGSBI4lzH1oDGnb6J9j7pYqt29t+kpV/qAAAV//uSBPQIgxAYU3tvMjhiAwpvbeZHDGBlS61sw6GMDKl1rZh0211rjTbNhA1A6wQLDsV1SIY4EQWMrYngsNrG8ba8QIVViHtS91LHJItFX02mm+2YCrwykCtMMI2uqTFSih6FoBkgSOJcx9aAxp2+ifY+6WKrdvbfpKVf6gAAAShlabe1tSgUEKORTYNX02VNqYtlGnKgQLmNHclGFhFlmechdayLpmiUUMo0cl+MSkejlQ/01gkOPaTizhorAhdOFdkjkqXkWIjm32/7frWryW+xeh28AAAEoZWm3tbUoFBCjkU2DV9NlTamLZRpyoEC5jR3JRhYRZZnnIXWsi6ZolFDKNHJfjEpHo5UP9NYJDj2k4s4aKwIXThXZI5Kl5FiI5t9v+361q8lvsXodvUAAQFpiG2v3tmhsUQGsRwsyIIZKWUP2Ke9RdjxycZGFSzmte6QGJLOKLCY+l0phFe6ZsV3BCLJO4QRgcmXi5cQFmICMCClCFJv8yXah0HAgYwBV9DJ+H3w++xQ0J79zRoAAgLTENtfvbNDYogNYjhZkQQyUv/7kgTuAALYGNLrTDKoWwMaXWmGVQsYhU3tsGshYxCpvbYNZMofsU96i7Hjk4yMKlnNa90gMSWcUWEx9LpTCK90zYruCEWSdwgjA5MvFy4gLMQEYEFKEKTf5ku1DoOBAxgCr6GT8Pvh99ihoT37mjQBiIkgACEITENrDTUmTFQ4D75PzGAFAce5bgKFUjmYFASRAfI0aQYBCCic5rhtZV3KZYrIpioGgPvJpytAemADBG1ir7Q5fayn2sZzAIk4ph3kyRACHLqHAKAkBNUV82CQaYgkhBI6/1puvl8tijCEkG4k3XKq0TthVUcNQlBC1GJwPAwEYbiM3PrVI+Fe/T7tDHi7dJ+PDhxN0xe+/2CrPdTzvNYpJEY3CXemfN7fz+2X9mN/9SOHpt5muNWY4Q4HCR2u1WrLqSiQZGtC8P4VW5Yyxztd5ttkTd6eSJIyVgQou4m9beUzuW8MIAGIiSAAIQhMQ2sNNSZMVDgPvk/MYAUBx7luAoVSOZgUBJEB8jRpBgEIKJzmuG1lXcplisimKgaA+8mnK0B6YAMEbWKvtDn/+5IE+QAC/yDVey8ZWF/kGq9l4ysdgacy7uXty7A05l3cvbl9rKfaxnMAiTimHeTJEAIcuocAoCQE1RXzYJBpiCSEEjr/Wm6+Xy2KMISQbiTdcqrRO2FVRw1CUELUYnA8DARhuIzc+tUj4V79Pu0MeLt0n48OHE3TF77/YKs91PO81ikkRjcJd6Z83t/P7Zf2Y3/1I4em3ma41ZjhDgcJHa7VasupKJBka0Lw/hVbljLHO13m22RN3p5IkjJWBCi7ib1t5TO5bwwhAwAZ2ONAFyQaWAszAKMdilp5J8OMKifWdt+IwWFryfmGHGaQ90TrVhobpw9DSUVhJBuQVu7aHKWMokTAJh42rFVRMMUeD0MxLeKNMNkJuNKW3pCg1guJClZWPwBZlD5MYkD4ud1fkleKOKw8Sv6yWNg0ctFQSCgGCgEyhEoXE4aiIoTwgcg4ncKOOOryaDsggqc+P8qyvdXvasyZXbsr3UlB/WIkTMPMUZRmXvF6FHSPT2H5SUlGQtJl6SiAMAGdjjQBckGlgLMwCjHYpaeSfDjCon1nbfiM//uSBGwABeRkUdN4O/C8jIo6bwd+DEFdb+ewq2GIK6389hVsFha8n5hhxmkPdE61YaG6cPQ0lFYSQbkFbu2hyljKJEwCYeNqxVUTDFHg9DMS3ijTDZCbjSlt6QoNYLiQpWVj8AWZQ+TGJA+LndX5JXijisPEr+sljYNHLRUEgoBgoBMoRKFxOGoiKE8IHIOJ3Cjjjq8mg7IIKnPj/Ksr3V72rMmV27K91JQf1iJEzDzFGUZl7xehR0j09h+UlJRkLSZekohyBmdoVVzUddeVQWshyLJtsF5BLtILZCHTxWqGpkufDMJRuoxRi/QeqU/bzGxB1DEHR6F5YDMIOlIyu1o+SMiLnqyD/krJPTp/v1tJWjd/rz06/v2iFJ52taPvsOtaTQxjKnIGZ2hVXNR115VBayHIsm2wXkEu0gtkIdPFaoamS58MwlG6jFGL9B6pT9vMbEHUMQdHoXlgMwg6UjK7Wj5IyIuerIP+Ssk9On+/W0laN3+vPTr+/aIUnna1o++w61pNDGMqaKt3TlASmz8Yq0cQEWjQ/7E1uQ+pXzIw2P/7kgQMgALTV1rp7CtAWmrrXT2FaAudaW2nsEtBc60ttPYJaHPIIoZQ0eItPZawFcKku9rTHI3H9ITjG0o9r3tesZWrI/9OzHZKNf5KRnTo2r2t/X//PXrWvUWucdYwylDCKUldTRVu6coCU2fjFWjiAi0aH/YmtyH1K+ZGGw55BFDKGjxFp7LWArhUl3taY5G4/pCcY2lHte9r1jK1ZH/p2Y7JRr/JSM6dG1e1v6//569a16i1zjrGGUoYRSkrqtSjkjdBTl1+BBSXl8BqsJ3ZL3ERvEHytxdvZEh+h2gvquXZCaT/kL+4KgyPaI6xDnZaUe16XtaZtd/va01abX+1paz0guv7d7delG6KCtSR14N7JjzrzzGSKWpTXalHJG6CnLr8CCkvL4DVYTuyXuIjeIPlbi7eyJD9DtBfVcuyE0n/IX9wVBke0R1iHOy0o9r0va0za7/e1pq02v9rS1npBdf27269KN0UFakjrwb2THnXnmMkUtSmtWIE1SCwAY7PEDbMc9hdVIXnRybMaMkui4xyRitqtq1rw7PwGrCzT9L/+5IEFAAC/mLaaesTsF/MW009YnYLSWtpR6RNAWktbSj0iaAJgQyDoyF5oqXpSjLsu95dy0futKUa/Wn9N7qnektKU6sj/9Phy9ke/SW6CDFs61ZNkdTRlIoHrYgTVILABjs8QNsxz2F1UhedHJsxoyS6LjHJGK2q2rWvDs/AasLNP0gmBDIOjIXmipelKMuy73l3LR+60pRr9af03uqd6S0pTqyP/0+HL2R79JboIMWzrVk2R1NGUigesq/kiAk5Z9DTEaLsK1TEnhF12YmzP2hEgeYK6m9P96Tra4Tkj8Os12OMjgmQfso03XnZetXXH5pq1+lGX3n/vWR1ZHXa//L06/9WltenRtaUHIudedPONEGWJKv5IgJOWfQ0xGi7CtUxJ4RddmJsz9oRIHmCupvT/ek62uE5I/DrNdjjI4JkH7KNN152XrV1x+aatfpRl95/71kdWR12v/y9Ov/VpbXp0bWlByLnXnTzjRBliQWZUBlZ8DZGJDCfYzi2SbSX5UbMrAeoOHGDybx8VNDRaSt9MnJxWms4cIR3+FElppq0//uSBBkAAxhaWsnoE2xjC0tZPQJtjCCxb0eky3GEFi3o9Jlu1JYQdaCgTKJlm5vqRnWzoO/Ry1mVJQIxFKRIaZ9IZzbf/y1vuFGR8rUwQrzzuSJMlgWZUBlZ8DZGJDCfYzi2SbSX5UbMrAeoOHGDybx8VNDRaSt9MnJxWms4cIR3+FElppq01JYQdaCgTKJlm5vqRnWzoO/Ry1mVJQIxFKRIaZ9IZzbf/y1vuFGR8rUwQrzzuSJMlorqqLlkkleBJQdC5BbJk4G1COXigK4GeGHipw1JTUnpZeFRaLPrg/K2F362RrJPmsFMSXNd23/rcjNb9I4cspGcanIoXRBYHVGwqieAISeGQ0FHft6KFigdKvW6/5lS/+iK6qi5ZJJXgSUHQuQWyZOBtQjl4oCuBnhh4qcNSU1J6WXhUWiz64Pythd+tkayT5rBTElzXdt/63IzW/SOHLKRnGpyKF0QWB1RsKongCEnhkNBR37eihYoHSr1uv+ZUv/oAakYu62RzjMClL6r8sNBwb2mXf1d3XehMgnuw9KSjKzBKh9YA5oZ1v/7kgQUAAK8O9nTBxNMV4d7OmDiaYtc03GnpG1xa5puNPSNrgnjKjGwalcKxBSxUz2aqIiIY1mYvo3+bTa1uuLkDADkChiNckg3TnDPzffU/b++sBqRi7rZHOMwKUvqvyw0HBvaZd/V3dd6EyCe7D0pKMrMEqH1gDmhnWCeMqMbBqVwrEFLFTPZqoiIhjWZi+jf5tNrW64uQMAOQKGI1ySDdOcM/N99T9v76wDI23HN/tbbkexNYA8YA30QONfL9kvOlDwC2KHlfNxbK/yk5D2/o4oc3N0jyySwzJgkGB22av+5fcX5/xilj+Zc5LuMbWt9jjiaiBliXptMJcA42rS1Yc+rsyQBkbbjm/2ttyPYmsAeMAb6IHGvl+yXnSh4BbFDyvm4tlf5Sch7f0cUObm6R5ZJYZkwSDA7bNX/cvuL8/4xSx/Mucl3GNrW+xxxNRAyxL02mEuAcbVpasOfV2ZJAGG40iU/o7SMqLHQCD8PKFU7vYKRwU/lD2nS8BRCxOapsbGDu3/SAiy2rlPZdvLrnjQiMthlyvWdZD+/mX/PKsT/+5IEIIAClTTVO0YbvFKmmqdow3eKVJ9vp5xtMUqT7fTzjabBSKWta0q70fzKn5C+T/1ft1gDDcaRKf0dpGVFjoBB+HlCqd3sFI4Kfyh7TpeAohYnNU2NjB3b/pARZbVynsu3l1zxoRGWwy5XrOsh/fzL/nlWJgpFLWtaVd6P5lT8hfJ/6v26yHI23rP/tbLkSIPdg0lOX6GUjETfZwdliGIZSNReFw4pSpJSPFwdENgRtM3TRThHj6Y4GRcNG8vEnBHnFEgML5Q0xqc8tYhSxpbUGhS/7P2//9JDkbb1n/2tlyJEHuwaSnL9DKRiJvs4OyxDEMpGovC4cUpUkpHi4OiGwI2mbpopwjx9McDIuGjeXiTgjziiQGF8oaY1OeWsQpY0tqDQpf9n7f/+lUE225LbtbG5cSrIvWjUbQnHhor5IMFv6OsiOckd/pq216nKFEnujETjXhVEkKZgoSo4t6VRcohZ9yHXefU088QjA/D49bQwpzNGXQM677NYp///+tBNtuS27WxuXEqyL1o1G0Jx4aK+SDBb+jrIjnJHf6at//uQBDoAAqIn2esPGPxURPs9YeMfigR3W6wtBXFAjut1haCutepyhRJ7oxE414VRJCmYKEqOLelUXKIWfch13n1NPPEIwPw+PW0MKczRl0DOu+zWKf///rABIKTkcjaScaHcg80+vesGtiZAdOIWZY76G6DHKQnFupkKssS2q18T7RN+6LySNYs4w3UbSaIiiUvGFVIoRFe5tq20diIg/iyF5z2eilPpWACQUnI5G0k40O5B5p9e9YNbEyA6cQsyx30N0GOUhOLdTIVZYltVr4n2ib90XkkaxZxhuo2k0RFEpeMKqRQiK9zbVto7ERB/FkLzns9FKfStATzln221sktiAkkbRSrIOGuDuLWxBaJvQYaD8a1Nij4LFVlBzXIZqPYYmhweFgBWFQDdsCamtFJlrzE5TsKoUlq+yrdyVT9+lUirSks5dxTqoATzln221sktiAkkbRSrIOGuDuLWxBaJvQYaD8a1Nij4LFVlBzXIZqPYYmhweFgBWFQDdsCamtFJlrzE5TsKoUlq+yrdyVT9+lUirSks5dxTqoQLjdu1//uSBFQCIo4YWunpEyxRwwtdPSJliiiHaawkabFFEO01hI02jknkQSZFKzTFtsVuTYGLArnpAVgUktI6+thtw7qPsI7ORRc0Sxb0nKvcic+DmBbUkiNba0HUGB8WQ9FYEcff6/6DdwMyNG0l9X6dTK0C43btY5J5EEmRSs0xbbFbk2BiwK56QFYFJLSOvrYbcO6j7COzkUXNEsW9Jyr3InPg5gW1JIjW2tB1BgfFkPRWBHH3+v+g3cDMjRtJfV+nUysQJlVGaI+/2sg2QAZtCS1JIYBc24fNUrqe5y5HcXxFiJPaS6IWqvZb0oR0ss3HfyQZdKYiyLbKZA6N7kKEIkcZFRFlnEhGKHIqCjUfr//9YgTKqM0R9/tZBsgAzaElqSQwC5tw+apXU9zlyO4viLESe0l0QtVey3pQjpZZuO/kgy6UxFkW2UyB0b3IUIRI4yKiLLOJCMUORUFGo/X//6wColJbLY4khNkmkjXwQPrMV9X9Vm2T96se+18A4a5VEl0utP99LNzEjw0c5nkzgdpQ+ZTVn2zf5tgx9IQAZASAwf/7kgRwAAJ7Klv55husT2VLfzzDdYpUp1usGE9xSpTrdYMJ7t1S8PYsojRuoSpL6GMlaGtxoBUSktlscSQmyTSRr4IH1mK+r+qzbJ+9WPfa+AcNcqiS6XWn++lm5iR4aOczyZwO0ofMpqz7Zv82wY+kIAMgJAYO6peHsWURo3UJUl9DGStDW40BSOXfXayNp7SWFr2l1UwGUoXQh5pAsv0q8QphdLpSZWeH2z/uXYos5qpOVbklMWrd3vDZ2nr4uJ3NUq8+GmHVi61KUKjyK3qEqe583Xzv1f///1gKRy767WRtPaSwte0uqmAylC6EPNIFl+lXiFMLpdKTKzw+2f9y7FFnNVJyrckpi1bu94bO09fFxO5qlXnw0w6sXWpShUeRW9QlT3Pm6+d+r///+sAAAkOJt2MkNcMKQhIwHJgqKBlbAq+fUBgxTvTBZuuGxNAB212IFGEYscnj0u2gAgnNxzN3POfC83M5I4N4YwZBRAaBMctIdHHR6Bux8XDzP/6v/1AAAEhxNuxkhrhhSEJGA5MFRQMrYFXz6gMGKd6YLN3/+5IEjQACnSHY6wwxbFOkOx1hhi2KjJE/rqRsgVGSJ/XUjZBw2JoAO2uxAowjFjk8el20AEE5uOZu55z4Xm5nJHBvDGDIKIDQJjlpDo46PQN2Pi4eZ//V/+oCWy2/3a2NuaGWGVsBjfk2jAQMSNZXCOpbXEokQJmRVQDI+PmOd13s1vdByuHoPGiopcn0embDTnrGBkG3uNHyCxLf1L07aRrG9rf//20gS2W3+7WxtzQywytgMb8m0YCBiRrK4R1La4lEiBMyKqAZHx8xzuu9mt7oOVw9B40VFLk+j0zYac9YwMg29xo+QWJb+penbSNY3tb//+2kCPX7+kEGARiXqbsgCoWBk5mY8HYRsgCRCgmCEfZBDEu+YlBS02TgNzrEYXsddlhHDU/oJcOpeKEVNQoC4nZ71Bo/Rs03txbi2iwqPTqtp239ckoCPX7+kEGARiXqbsgCoWBk5mY8HYRsgCRCgmCEfZBDEu+YlBS02TgNzrEYXsddlhHDU/oJcOpeKEVNQoC4nZ71Bo/Rs03txbi2iwqPTqtp239ckpUAA0OV//uSBKQAAnMcWmnsQexOY4tNPYg9imh7Qy2wZWFND2hltgysJVbcjKAXcBDScEFgEAIKAj+gQOR9RCLhiOAkpdfC3GCjr0SIk1nF53iv9Itcv2JTxQPhkcSFDYMlQ+WepTDqxetC+vO3DpktA7z7ms+oAA0OVJVbcjKAXcBDScEFgEAIKAj+gQOR9RCLhiOAkpdfC3GCjr0SIk1nF53iv9Itcv2JTxQPhkcSFDYMlQ+WepTDqxetC+vO3DpktA7z7ms+oAJ2aHZ322tjYzeAijYbWwr1zUhp5vrTvxGTBFCAJyhpxaak9VFc+HLXEvZ5N4de7ONnMx/rx5yJRnSiGbumW52ol5f2eDNdJvq4L1SfvT7KuwWUAE7NDs77bWxsZvARRsNrYV65qQ0831p34jJgihAE5Q04tNSeqiufDlriXs8m8OvdnGzmY/1485EozpRDN3TLc7US8v7PBmuk31cF6pP3p9lXYLKVACZGiJht/7pHJsRSDbC2kI/zQawAqvBo9ccVak9MXq2WRRnDYRSNXB7iYzlb4o4lpGOHsy5zRP/7kgTBAAKOH9H7jBlIUcP6P3GDKQps7WfsGE3xTZ2s/YMJvg/gmTlBbC8epYihFYuO1KQ1c+7tf3fX9LPqACZGiJht/7pHJsRSDbC2kI/zQawAqvBo9ccVak9MXq2WRRnDYRSNXB7iYzlb4o4lpGOHsy5zRA/gmTlBbC8epYihFYuO1KQ1c+7tf3fX9LPqAWd32stkaScTGcBJ7TNqZiaYT6fAtlu+nflMTpo/uksCzQsVO3lFXs9iI46VfFuxmnFadcyZ+slPxKIWgQAgUK2kr0MO3psYRocwhdQvKqbT7Ffo7/otTTsAWd32stkaScTGcBJ7TNqZiaYT6fAtlu+nflMTpo/uksCzQsVO3lFXs9iI46VfFuxmnFadcyZ+slPxKIWgQAgUK2kr0MO3psYRocwhdQvKqbT7Ffo7/otTTsUACVqLuHvutkcogCGA8/aGMzosXIt+DfJwwm8SxmVBMhJjiPh5JDe0aI6wqroAhgMtFLP6xEel08y4iI0ThvfeXK/cyp0ruZGt8O9FMXcXoSA0Poe8ziX2+vR+qyOAAlb/+5IE2oACiCHUe0wZaFEEOo9pgy0LKJdbrBhxMWUS63WDDiai7h77rZHKIAhgPP2hjM6LFyLfg3ycMJvEsZlQTISY4j4eSQ3tGiOsKq6AIYDLRSz+sRHpdPMuIiNE4b33lyv3MqdK7mRrfDvRTF3F6EgND6HvM4l9vr0fqsjhA4eYiHfb/aSXiRg6tnjsLZTFK1msioaFkifHAwg4AAXs5BT6mU/qH7RO86pr5mrxlIYzlvEXkCCcMiH/OGFKc4rWwg9i1MxHcz6e1NkpqQeys8xAlsHyFW/9PtanxbqEDh5iId9v9pJeJGDq2eOwtlMUrWayKhoWSJ8cDCDgABezkFPqZT+oftE7zqmvmavGUhjOW8ReQIJwyIf84YUpzitbCD2LUzEdzPp7U2SmpB7KzzECWwfIVb/0+1qfFuoCOGeHd3222klsNEG1HNe4hB+k+jIdR6T9Do7E2N8zBlRQUGDp4lWZMzp0jI5tCeGzlF5ELP/XX6w7AePOelcqGJaLrOhbtOC9a058jtehtaqEUbGaaP9rKqwI4Z4d3fbbaSWw//uSBO8AAuo1U/tvGPhdRqp/beMfC/j5a+eYr7F/Hy188xX20QbUc17iEH6T6Mh1HpP0OjsTY3zMGVFBQYOniVZkzOnSMjm0J4bOUXkQs/9dfrDsB4856VyoYlous6Fu04L1rTnyO16G1qoRRsZpo/2sqrAAlXd5ldd9Y5FjBauf4ooKqauu5k4pVi9k9gEcsjcmE4sHStxawfbm346h+utkTqIrLts2pqYHCmRjHppZQ9oMs2a/QdOTyPa5OdX2LZMmOa4SdrFdoXY9whiwOlHsNSjDm3UPY2ixGLAASru8yuu+scixgtXP8UUFVNXXcycUqxeyewCOWRuTCcWDpW4tYPtzb8dQ/XWyJ1EVl22bU1MDhTIxj00soe0GWbNfoOnJ5HtcnOr7FsmTHNcJO1iu0Lse4QxYHSj2GpRhzbqHsbRYjFkABnpmV1m2sbUaGRBpPWosEQ5By/44CQSiUPp0FikcFqpazRHGeOL3EiU8UOL/Gw51AzqWo9EDq+REnW+0rkOdPAiPjUBi8nAti0nBFsPBNiBRM/PnyMn91yq3Nf/7kgTxAALOLlr540xsWcXLXzxpjY0k703tMGfhpJ3pvaYM/CUTqtPXoZShaQAGemZXWbaxtRoZEGk9aiwRDkHL/jgJBKJQ+nQWKRwWqlrNEcZ44vcSJTxQ4v8bDnUDOpaj0QOr5ESdb7SuQ508CI+NQGLycC2LScEWw8E2IFEz8+fIyf3XKrc1JROq09ehlKFpACUjbFf9MYTAJiChH4DWYIFRhkXtUYe6D13AGExYDPCJSZFJxZFgyrzZQDL9sgbEoJicJrqDAQ4FzqwOXBcmDrgmBQyG3A4C4SIIrXPHFhTXdHK1k59CNDu7kFzQTRhyp1c6qxlIASkbYr/pjCYBMQUI/AazBAqMMi9qjD3Qeu4AwmLAZ4RKTIpOLIsGVebKAZftkDYlBMThNdQYCHAudWBy4LkwdcEwKGQ24HAXCRBFa544sKa7o5WsnPoRod3cguaCaMOVOrnVWMpVAAaHdoV9do202ZheANvXmGzSJvY097eO5DMpdt9ndc95JVHr1/llaZJhAniyjmmam8f1P8Y2PLrbPIOyw2L5EefMpRr/+5IE7QADKCTS+2wZ2GUEml9tgzsMtG07jiRpAZaNp3HEjSAWV1rkzkPahUi0HCKdzUvUrTRjuzfV+tbukABod2hX12jbTZmF4A29eYbNIm9jT3t47kMyl232d1z3klUevX+WVpkmECeLKOaZqbx/U/xjY8uts8g7LDYvkR58ylGhZXWuTOQ9qFSLQcIp3NS9StNGO7N9X61u6QAYqYd2jf+2ySOiFUB77jhgTYej0AUVhMvPUAD6kZpEB6X/as0ewWewsBKWUUwJx26SWDzeQspymYxJP6kIlJv/f7TO+X7iRR7olPtN1qCbF+6NU+TQYciclxj/t+tQAMVMO7Rv/bZJHRCqA99xwwJsPR6AKKwmXnqAB9SM0iA9L/tWaPYLPYWAlLKKYE47dJLB5vIWU5TMYkn9SESk3/v9pnfL9xIo90Sn2m61BNi/dGqfJoMOROS4x/2/WpUASyCJCtUgcCxiKRJ2SDRg6CBjEELitdY+OoByyDwcLSUWpYD3DlN11j5DUYYmHH9tSplI/QS3AQYeSoUFS6CQYw8MpkkkBr0p//uSBOEAAuwfUvt4MHhdg+pfbwYPC9TNUe0wZeF6mao9pgy8rHvuHLTNrYEWJuG6L0dFYSUz7f/2ACWQRIVqkDgWMRSJOyQaMHQQMYghcVrrHx1AOWQeDhaSi1LAe4cpuusfIajDEw4/tqVMpH6CW4CDDyVCgqXQSDGHhlMkkgNelNY99w5aZtbAixNw3RejorCSmfb/+wACamHh3+33tlcoR7niFIkm7YsEcmConlVf5MQYC0i5vX4OkBUhMHApLkTTKQ4bcKT7578TKFy36UI2jGdg4GhgPrtH3oQ9a7NL03VhBfVJj7tf/63r9gAE1MPDv9vvbK5Qj3PEKRJN2xYI5MFRPKq/yYgwFpFzevwdICpCYOBSXImmUhw24Un3z34mULlv0oRtGM7BwNDAfXaPvQh612aXpurCC+qTH3a//1vX7AAHiHZ3a3aRxxL4LczmGkZS2VdczT2gvwI5qfBqemBVeIMkMQLWcFJN8W8o5HaV2l8irdRU+AwEPPIDy7VOcdYdGOYUE+cCU65dQ0okVcelTYsQlIH1v0oZfH76pv/7kgTjgALxGU5jrBnQXiMpzHWDOgrctVPssGVhW5aqfZYMrFz+t6r6AAHiHZ3a3aRxxL4LczmGkZS2VdczT2gvwI5qfBqemBVeIMkMQLWcFJN8W8o5HaV2l8irdRU+AwEPPIDy7VOcdYdGOYUE+cCU65dQ0okVcelTYsQlIH1v0oZfH76plz+t6r6AAFZ4d2SW2NpJi5hhqe8BIUlBJBwHqD+Sh9HcqOhWTUg+KTh7GNjXCkhETtDrB/dii5c6ymSoUKX30ovBTATHPUm8zDgvARBJSIdDUyzHbEWaEx1VO7//f1AAKzw7sktsbSTFzDDU94CQpKCSDgPUH8lD6O5UdCsmpB8UnD2MbGuFJCInaHWD+7FFy51lMlQoUvvpReCmAmOepN5mHBeAiCSkQ6GplmO2Is0Jjqqd3/+/qQApQAIADBQGMfUA9mM8w2E4KBa2iA+POrE3Dus6jz/WYKp2CMhppxGAUGUGDCghHcENK2yY/F+yi0lhwnV8xM226XjHos4a9zTox6ho4PHVEGgFpfJra81es9KYqDzjIWNYp9T/+5IE7YADEhlS+0wyKGJDKl9phkULJI9J7bBloWSR6T22DLQo2hiU+7WgAKUACAAwUBjH1APZjPMNhOCgWtogPjzqxNw7rOo8/1mCqdgjIaacRgFBlBgwoIR3BDStsmPxfsotJYcJ1fMTNtul4x6LOGvc06MeoaODx1RBoBaXya2vNXrPSmKg84yFjWKfUKNoYlPu1oAUmtlskjaSjoG0GTAydFIcAaZEkWloSWSaSR4G0ai8EqJQtGiMzlNzZ7ep7kch0a4qVWsYDSOVVniwVDXy34lpUefLet3yrom/I578RQVW56gFJrZbJI2ko6BtBkwMnRSHAGmRJFpaElkmkkeBtGovBKiULRojM5Tc2e3qe5HIdGuKlVrGA0jlVZ4sFQ18t+JaVHny3rd8q6JvyOe/EUFVuepMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//uSBPEAA1YnzMudGHBqxPmZc6MOCihjV6ewwbFFDGr09hg2VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUqqv/+yg5kyLYScWFswOzBwzVrLATk1zWSyxyP/zJlDAnDJkBC7MWZxfyLv//8U/xQqqv/+yg5kyLYScWFswOzBwzVrLATk1zWSyxyP/zJlDAnDJkBC7MWZxfyLv//8U/xRUxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7kgRxj/GGF8pJ7BisMML5ST2DFYAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=')
        });
        Object.defineProperty(this, "worker", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "elementContainerSelector", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'div.timers'
        });
        Object.defineProperty(this, "element", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: $(`
        <div class="timer">
            <div class="label" title="Identifier of this timer">-</div>
            <div class="cycle" title="Current cycle">-</div>
            <div class="cycleElapsed" title="Elapsed time in current cycle">-</div>
            <div class="alertAfter hidden" title="Maximum target time for each cycle"></div>
            <div class="totalElapsed" title="Total time elapsed since start">-</div>
            <div class="averageElapsed" title="Average time elapsed per cycle">-</div>
            <div class="ctrl">
                <button class="start" title="Start timer">!</button>
                <button class="reset hidden" title="Start new cycle">+</button>
                <button class="stop hidden" title="Stop timer">·</button>
                <button class="delete" title="Delete timer">×</button>
            </div>
        </div>
    `)
        });
        if (label) {
            this.label = label.trim();
        }
        else {
            this.label = this.id;
        }
        if (alertAfter) {
            this.alertAfter = this.durToMillisec(alertAfter);
        }
        if (alertAudioVolume) {
            let vol = parseFloat(alertAudioVolume);
            if (vol >= 0.0 || vol <= 1.0) {
                this.alertAudioVolume = vol;
            }
        }
        this.alertAudio.volume = this.alertAudioVolume;
        this.worker = new Worker('./reflow-worker.js');
        this.worker.onmessage = (event) => {
            this.updateElement(event.data.cycleElapsed, event.data.totalElapsed, event.data.averageElapsed, event.data.overdueCycle, event.data.overdueAverage);
            if (event.data.overdueCycle > 0 && this.alertAudio.paused) {
                this.alertAudio.play();
            }
        };
        this.bakeElement();
    }
    add() {
        $(this.element).appendTo(this.elementContainerSelector);
    }
    start() {
        this.avoidDoubleClick('.ctrl button');
        $(this.element).find('.ctrl .start').remove();
        $(this.element).find('.ctrl .reset').removeClass('hidden');
        $(this.element).find('.ctrl .stop').removeClass('hidden');
        let now = Date.now();
        this.startedOn = now;
        this.cycleStartedOn = now;
        this.cycle = 1;
        $(this.element).find('.cycle').text(this.cycle);
        this.worker.postMessage({
            action: 'start',
            startedOn: this.startedOn,
            cycleStartedOn: this.cycleStartedOn,
            cycle: this.cycle,
            alertAfter: this.alertAfter,
        });
    }
    reset() {
        this.avoidDoubleClick('.ctrl .reset');
        this.cycleStartedOn = Date.now();
        this.cycle += 1;
        $(this.element).find('.cycle').text(this.cycle);
        $(this.element).find('.cycleElapsed').removeClass('alert');
        $(this.element).find('.averageElapsed').removeClass('alert');
        this.worker.postMessage({
            action: 'reset',
            startedOn: this.startedOn,
            cycleStartedOn: this.cycleStartedOn,
            cycle: this.cycle,
            alertAfter: this.alertAfter,
        });
    }
    stop() {
        this.avoidDoubleClick('.ctrl button');
        $(this.element).find('.ctrl .reset').remove();
        $(this.element).find('.ctrl .stop').remove();
        this.worker.postMessage({
            action: 'stop',
        });
        this.worker.terminate();
    }
    delete() {
        this.avoidDoubleClick('.ctrl button', true);
        $(this.element).remove();
        this.worker.postMessage({
            action: 'delete',
        });
        this.worker.terminate();
    }
    updateElement(cycleElapsed, totalElapsed, averageElapsed, overdueCycle, overdueAverage) {
        $(this.element).find('.cycleElapsed').html(this.MillisecToDur(cycleElapsed));
        $(this.element).find('.totalElapsed').html(this.MillisecToDur(totalElapsed));
        if (this.cycle > 1) {
            $(this.element).find('.averageElapsed').html(this.MillisecToDur(averageElapsed));
        }
        if (overdueCycle)
            $(this.element).find('.cycleElapsed').addClass('alert');
        if (overdueAverage)
            $(this.element).find('.averageElapsed').addClass('alert');
    }
    getNewId(length = 6) {
        let chars = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
        let id = '';
        length = Math.min(length, chars.length);
        while (id.length < length) {
            id += chars.splice(Math.floor(Math.random() * chars.length), 1);
        }
        return id;
    }
    bakeElement() {
        $(this.element).find('.ctrl .start').on('click', () => { this.start(); });
        $(this.element).find('.ctrl .reset').on('click', () => { this.reset(); });
        $(this.element).find('.ctrl .stop').on('click', () => { this.stop(); });
        $(this.element).find('.ctrl .delete').on('click', () => { this.delete(); });
        $(this.element).find('.label').text(this.label);
        if (this.alertAfter > 0) {
            $(this.element).find('.alertAfter')
                .text(`(${this.MillisecToDur(this.alertAfter)})`)
                .removeClass('hidden');
        }
    }
    avoidDoubleClick(elementSelector, everywhere = false, timeout = 750) {
        let e = null;
        if (!everywhere) {
            e = $(this.element).find(elementSelector);
        }
        else {
            e = $(elementSelector);
        }
        $(e).prop('disabled', true);
        setTimeout(() => {
            if (!e)
                return;
            $(e).prop('disabled', false);
        }, timeout);
    }
    MillisecToDur(milliseconds, fixedPoint = false) {
        const seconds = milliseconds / 1000;
        const d = Math.floor(seconds / (3600 * 24));
        const h = Math.floor(seconds % (3600 * 24) / 3600);
        const m = Math.floor(seconds % 3600 / 60);
        const s = (!fixedPoint) ? Math.floor(seconds % 60) : seconds % 60;
        let elapsed = '';
        if (seconds >= 86400)
            elapsed += `${d}:`;
        if (seconds >= 3600)
            elapsed += `${h}:`;
        if (seconds >= 60)
            elapsed += `${m.toFixed(0).padStart(2, '0')}:`;
        elapsed += (!fixedPoint) ? `${s.toFixed(0).padStart(2, '0')}` : `${s.toFixed(2).padStart(5, '0')}`;
        return elapsed;
    }
    durToMillisec(duration) {
        const dur = duration.split(' ');
        let s = 0;
        dur.forEach(v => {
            const re = new RegExp(/(\d+)([dhms]{1})/, 'gi');
            const rem = re.exec(v);
            if (!rem ||
                !rem[1] ||
                !rem[2])
                return 0;
            switch (rem[2]) {
                case 'd':
                    s += parseInt(rem[1]) * 86400;
                    break;
                case 'h':
                    s += parseInt(rem[1]) * 3600;
                    break;
                case 'm':
                    s += parseInt(rem[1]) * 60;
                    break;
                case 's':
                    s += parseInt(rem[1]);
                    break;
            }
        });
        return s * 1000;
    }
}
